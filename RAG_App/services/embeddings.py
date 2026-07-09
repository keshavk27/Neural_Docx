import os
from dotenv import load_dotenv
# from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import OpenAIEmbeddings

load_dotenv()

os.environ['OPENAI_API_KEY']=os.getenv("OPENAI_API_KEY")

embeddings=OpenAIEmbeddings(model="text-embedding-3-large")

# os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")

# embeddings = HuggingFaceEmbeddings(
#     model_name="all-MiniLM-L12-v2"
# )