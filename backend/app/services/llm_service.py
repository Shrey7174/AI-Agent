
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from dotenv import load_dotenv
import time 

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


def create_linkedin_post_agent(user_profile: dict, topic: str, post_type: str):
    """
    Orchestrates the AI agent using LangChain to generate a post.
    """
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GOOGLE_API_KEY)
    
    dynamic_prompt = ""
    if post_type == "quick_update":
        dynamic_prompt = "Write a concise, professional LinkedIn post that is a quick update. Keep it under 50 words."
    elif post_type == "opinion_piece":
        dynamic_prompt = "Write a thoughtful and engaging LinkedIn post that is an opinion piece. It should be a few paragraphs long."
    else:
        dynamic_prompt = "Generate a compelling, professional, and engaging LinkedIn post."

    prompt_template = ChatPromptTemplate.from_messages(
        [
            ("system", f"You are a LinkedIn personal branding AI agent for a user named {user_profile.get('name')}. Your goal is to {dynamic_prompt}"),
            ("human", "The post should be about the following topic: {topic}. Ensure it is concise, professional, and includes relevant hashtags."),
        ]
    )
    
    chain = prompt_template | llm
    response = chain.invoke({"topic": topic})
    return response