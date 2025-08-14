# app/services/linkedin_service.py
# Business logic for interacting with the LinkedIn API.

import os
import requests
import json # --- ADDED: Import json for better payload handling ---
from dotenv import load_dotenv

load_dotenv()

LINKEDIN_CLIENT_ID = os.getenv("LINKEDIN_CLIENT_ID")
LINKEDIN_CLIENT_SECRET = os.getenv("LINKEDIN_CLIENT_SECRET")
REDIRECT_URI = "http://127.0.0.1:5000/linkedin-callback"
LINKEDIN_AUTH_URL = f"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={LINKEDIN_CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile%20email%20w_member_social"

def get_user_profile_data(user_access_token: str):
    """Fetches the user's basic profile data from LinkedIn using the userinfo endpoint."""
    profile_api_url = "https://api.linkedin.com/v2/userinfo"
    headers = {"Authorization": f"Bearer {user_access_token}"}
    response = requests.get(profile_api_url, headers=headers)
    response.raise_for_status()
    return response.json()

def publish_to_linkedin(post_data: dict, access_token: str):
    """
    Publishes a text post to LinkedIn.
    """
    post_api_url = "https://api.linkedin.com/v2/ugcPosts"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
    }
    
    # --- CHANGE: Corrected payload for specificContent and added visibility field ---
    payload = {
        "author": f"urn:li:person:{post_data['linkedin_id']}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": post_data['content']
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    try:
        response = requests.post(post_api_url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        print("LinkedIn API Error:", e.response.text)
        raise e