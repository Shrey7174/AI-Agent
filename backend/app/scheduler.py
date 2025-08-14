# app/scheduler.py
from datetime import datetime
from .database import db
from .models import Post
from .services.linkedin_service import publish_to_linkedin
import requests # --- ADDED: Import the requests library to check the exception ---
import json # --- ADDED: Import json to parse the error response ---

def publish_scheduled_posts(app):
    """
    Checks for scheduled posts and publishes them.
    """
    with app.app_context():
        due_posts = Post.query.filter(Post.scheduled_at <= datetime.utcnow(), Post.is_scheduled == 1).all()
        for post in due_posts:
            user = post.user 
            if user and user.access_token:
                try:
                    # The publish_to_linkedin function will raise an exception on failure
                    publish_to_linkedin({
                        "content": post.content,
                        "linkedin_id": user.linkedin_id
                    }, user.access_token)
                    
                    post.is_scheduled = 0 # Mark as published on success
                    db.session.commit()
                    print(f"Post {post.id} published to LinkedIn.")
                except requests.exceptions.HTTPError as e:
                    db.session.rollback()
                    print(f"Failed to publish post {post.id}: {e}")
                    
                    # --- CHANGE: Check for the specific 'duplicate post' error ---
                    error_message = json.loads(e.response.text)
                    if error_message.get("errorDetails", {}).get("inputErrors", [{}])[0].get("code") == "DUPLICATE_POST":
                        post.is_scheduled = 0 # Mark as published if it's a duplicate
                        db.session.commit()
                        print(f"Post {post.id} already exists on LinkedIn, marked as published locally.")
                    else:
                        db.session.rollback()
                        print(f"Failed to publish post {post.id} with unhandled error: {e}")