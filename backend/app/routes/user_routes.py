from flask import Blueprint, jsonify, abort
from ..database import db
from ..models import User
from ..schemas import UserResponse

user_bp = Blueprint('user_routes', __name__)

@user_bp.route("/<int:user_id>", methods=['GET'])
def read_user(user_id):
    """Retrieves a user's profile from the database."""
    db_user = User.query.get(user_id)
    if db_user is None:
        abort(404, description="User not found")
    
    user_schema = UserResponse.from_orm(db_user)
    return jsonify(user_schema.dict())