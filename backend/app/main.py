# app/main.py
from flask import Flask, jsonify
from flask_cors import CORS
from .database import db
from .models import User, Post
from .routes.user_routes import user_bp
from .routes.content_routes import content_bp
from apscheduler.schedulers.background import BackgroundScheduler
from .scheduler import publish_scheduled_posts
import aiosqlite
import os

scheduler = BackgroundScheduler()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # --- Database Configuration ---
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///./sql_app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()

    # --- CHANGE: Ensure the content_bp is registered with the app ---
    app.register_blueprint(user_bp, url_prefix="/users")
    app.register_blueprint(content_bp)
    
    scheduler.add_job(
        func=publish_scheduled_posts, 
        trigger='interval', 
        minutes=1,
        args=[app]
    )
    scheduler.start()

    @app.route("/")
    def read_root():
        return jsonify({"message": "Welcome to the INFLUENCE OS API!"})
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)