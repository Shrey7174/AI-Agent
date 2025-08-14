# AI-Agent

Empowering Growth Through Intelligent Automation.
An autonomous AI agent that researches, creates, and posts LinkedIn content for personal branding.
This fully functional web application automates content creation and scheduling, helping users maintain a professional online presence with minimal effort.

# Features
- Autonomous Content Generation 
- AI agent powered by LangChain and Google Gemini that autonomously researches current industry trends and creates  Navigate to backend folder
cd backend

# Create and activate virtual environment (Linux/macOS)
python3 -m venv venv
source venv/bin/activate

# For Windows (CMD)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

Create a .env file in the backend directory with your credentials:

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
GOOGLE_API_KEY=your_google_api_key

Run the backend server:

python -m app.main

2. Frontend Setup

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

Frontend will be available at:
👉 http://localhost:5173
🎯 Usage

    Connect to LinkedIn
    Click "Connect to LinkedIn" on the dashboard to authenticate with your account.

    Generate a Post
    Click "Generate Content" — the AI agent will research trending topics and create a LinkedIn post.

    Schedule a Post
    Use "Schedule Post" to add it to your content calendar.
    The background scheduler will publish it automatically.

📌 Future Improvements

    Support for multiple social platforms (Twitter, Instagram, etc.)

    Advanced analytics for post engagement

    User-defined posting templates

            professional LinkedIn posts.

Automated Posting 
Background scheduler (APScheduler) that automatically publishes content to LinkedIn at a set time.

Full-Stack Architecture 
Backend built with Python + Flask and a dynamic frontend with React + Vite.

LinkedIn Integration 
Seamless authentication via OAuth 2.0 with API calls to fetch user profile data and publish content.

Content Calendar 
Simple dashboard to view, manage, and track all scheduled posts.

 Technical Stack
Category	Technology
AI/ML	LangChain, Google Generative AI (gemini-1.5-pro)
Backend	Python, Flask, Flask-SQLAlchemy, APScheduler
Frontend	React, Vite, Tailwind CSS, Lucide React Icons
Database	SQLite (Development)
API	LinkedIn API, Google Search API

🚀 Getting Started

Follow these steps to set up the project locally.

Prerequisites

Python 3.11+

Node.js 18+ and npm

1. Backend Setup

 Navigate to backend folder
cd backend

# Create and activate virtual environment (Linux/macOS)
python3 -m venv venv
source venv/bin/activate

# For Windows (CMD)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

Create a .env file in the backend directory with your credentials:

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
GOOGLE_API_KEY=your_google_api_key

Run the backend server:

python -m app.main

2. Frontend Setup

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

Frontend will be available at:
👉 http://localhost:5173
🎯 Usage

    Connect to LinkedIn
    Click "Connect to LinkedIn" on the dashboard to authenticate with your account.

    Generate a Post
    Click "Generate Content" — the AI agent will research trending topics and create a LinkedIn post.

    Schedule a Post
    Use "Schedule Post" to add it to your content calendar.
    The background scheduler will publish it automatically.

📌 Future Improvements

    Support for multiple social platforms (Twitter, Instagram, etc.)

    Advanced analytics for post engagement

    User-defined posting templates

