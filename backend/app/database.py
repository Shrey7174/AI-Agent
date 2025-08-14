from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
Base = declarative_base()