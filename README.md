# AI-Agent

An autonomous AI agent that researches, creates, and posts LinkedIn content for personal branding. This project is a fully functional web application that automates content creation and scheduling, allowing users to maintain a professional online presence with minimal effort.

<br>

# Features

    Autonomous Content Generation : An AI agent powered by LangChain and Google Gemini that autonomously researches current industry trends and creates engaging, professional posts.

    Automated Posting : A background scheduler (APScheduler) that automatically publishes content to LinkedIn at a set time.

    Full-Stack Architecture : A robust backend built with Python/Flask and a dynamic frontend built with React/Vite.

    LinkedIn Integration : Seamless authentication via OAuth 2.0 and API calls to fetch user data and publish content.

    Content Calendar : A simple dashboard to view and manage all scheduled posts.

<br>

Technical Stack

Category	Technology
AI/ML	LangChain, Google Generative AI (gemini-1.5-pro)
Backend	Python, Flask, Flask-SQLAlchemy, APScheduler
Frontend	React, Vite, Tailwind CSS, Lucide React Icons
Database	SQLite (for development)
API	LinkedIn API, Google Search API

<br>

 Getting Started

Follow these steps to get a copy of the project up and running on your local machine.

# Prerequisites

    Python 3.11+

    Node.js 18+ and npm

1. Backend Setup

    Navigate to the backend directory.

    Set up your virtual environment and install dependencies:
    ```Bash

pip install -r requirements.txt
     ```
Create a .env file in the backend directory with your API keys:
```Bash
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
GOOGLE_API_KEY=your_google_api_key
```
Run the backend server:
```Bash

    python -m app.main
```
2. Frontend Setup

    Navigate to the frontend directory.

    Install dependencies:
    ```Bash

npm install
```
Run the frontend development server:
```Bash

    npm run dev
```
The application will be available at http://localhost:5173.

<br>

# Usage

    Connect to LinkedIn: Click the "Connect to LinkedIn" button on the frontend to authenticate with your account.

    Generate a Post: Click the "Generate Content" button. The AI agent will autonomously research a topic and generate a post.

    Schedule a Post: Click "Schedule Post" to save the post to your content calendar. The background scheduler will automatically publish it to LinkedIn within a minute.

