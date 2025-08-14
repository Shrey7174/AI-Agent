# app/routes/content_routes.py
from flask import Blueprint, request, redirect, url_for, jsonify, abort
from ..database import db
from ..models import User, Post
from ..schemas import PostCreate, PostResponse, GeneratePostRequest
from ..services.linkedin_service import get_user_profile_data, LINKEDIN_AUTH_URL, LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, REDIRECT_URI
from ..services.llm_service import create_linkedin_post_agent
import httpx
from datetime import datetime, timedelta
from pydantic import ValidationError
import traceback

content_bp = Blueprint('content_routes', __name__)

@content_bp.route("/linkedin-auth")
def linkedin_auth():
    """Initiates the LinkedIn OAuth 2.0 flow."""
    return redirect(LINKEDIN_AUTH_URL)

@content_bp.route("/linkedin-callback")
def linkedin_callback():
    """Exchanges the authorization code for an access token and stores it."""
    code = request.args.get("code")
    if not code:
        abort(400, description="Authorization code not found.")
    
    token_url = "https://www.linkedin.com/oauth/v2/accessToken"
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": LINKEDIN_CLIENT_ID,
        "client_secret": LINKEDIN_CLIENT_SECRET,
    }

    with httpx.Client() as client:
        response = client.post(token_url, data=payload)
        response_data = response.json()

    if response.status_code != 200:
        abort(400, description="Failed to get access token.")
    
    access_token = response_data.get("access_token")
    expires_in = response_data.get("expires_in")
    token_expires_at = datetime.utcnow() + timedelta(seconds=expires_in)

    profile_data = get_user_profile_data(access_token)
    linkedin_id = profile_data.get("sub")
    name = profile_data.get("name")

    db_user = User.query.filter_by(linkedin_id=linkedin_id).first()
    if not db_user:
        db_user = User(
            name=name,
            linkedin_id=linkedin_id,
            access_token=access_token,
            token_expires_at=token_expires_at
        )
        db.session.add(db_user)
        db.session.commit()
        db.session.refresh(db_user)
    else:
        db_user.access_token = access_token
        db_user.token_expires_at = token_expires_at
        db.session.commit()
    
    redirect_url = f"http://localhost:5173/?user_id={db_user.id}"
    return redirect(redirect_url)

@content_bp.route("/generate-post/", methods=['POST'])
def generate_linkedin_post():
    """Generates a professional LinkedIn post using a LangChain agent."""
    try:
        request_data = GeneratePostRequest(**request.get_json())
    except ValidationError as e:
        abort(400, description=str(e))
        
    db_user = User.query.get(request_data.user_id)
    if not db_user or not db_user.access_token:
        abort(404, description="User or access token not found. Please connect your LinkedIn account.")
    
    user_profile_dict = {
        "name": db_user.name,
        "title": db_user.title,
        "linkedin_id": db_user.linkedin_id
    }
    
    try:
        generated_text = create_linkedin_post_agent(
            user_profile_dict, 
            request_data.topic, 
            request_data.post_type
        )
        return jsonify({"content": generated_text.content})
    except Exception as e:
        print("An exception occurred in generate_linkedin_post:")
        traceback.print_exc()
        abort(500, description=f"Failed to generate post: {e}")

@content_bp.route("/schedule-post/", methods=['POST'])
def schedule_post():
    """Schedules a new post in the database."""
    try:
        post_data = PostCreate(**request.get_json())
        new_post = Post(**post_data.dict())
        db.session.add(new_post)
        db.session.commit()
        
        post_schema = PostResponse.from_orm(new_post)
        return jsonify(post_schema.dict())
    except ValidationError as e:
        abort(400, description=str(e))

@content_bp.route("/calendar/<int:user_id>", methods=['GET'])
def get_content_calendar(user_id):
    """Retrieves all scheduled posts for a user from the database."""
    posts = Post.query.filter_by(user_id=user_id).all()
    # The ValidationError is likely happening here on older posts
    posts_list = [PostResponse.from_orm(post).dict() for post in posts]
    return jsonify(posts_list)