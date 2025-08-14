from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    title: Optional[str] = None
    linkedin_profile_url: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        # --- FIX: Renamed orm_mode to from_attributes ---
        from_attributes = True

class PostCreate(BaseModel):
    user_id: int
    content: str
    scheduled_at: datetime
    post_type: str
    topic: str

class PostResponse(PostCreate):
    id: int
    created_at: datetime
    is_scheduled: int
    class Config:
        # --- FIX: Renamed orm_mode to from_attributes ---
        from_attributes = True

# --- NEW: Schema for the post generation request ---
class GeneratePostRequest(BaseModel):
    user_id: int
    topic: str
    post_type: str = "text_update"