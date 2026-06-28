import os
import shutil
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from services.embeddings import embeddings
from dotenv import load_dotenv
load_dotenv()


CHUNK_SIZE = 5000
CHUNK_OVERLAP = 200

VECTOR_DB_DIR = os.getenv("VECTOR_DB_DIR","./vectorDB")


def create_vector_store(documents, session_id: str):
    
    try:

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
        )

        splits = splitter.split_documents(documents)

        persist_directory = os.path.join(
            VECTOR_DB_DIR,
            session_id,
        )

        vector_store = Chroma.from_documents(documents=splits,embedding=embeddings,persist_directory=persist_directory,)

        return vector_store

    except Exception as error:

        raise Exception(
            f"Failed to create vector store: {str(error)}"
        )


def load_vector_store(session_id: str):
    
    try:

        persist_directory = os.path.join(
            VECTOR_DB_DIR,
            session_id,
        )

        if not os.path.exists(persist_directory):
            raise Exception("Vector store not found.")

        vector_store = Chroma(embedding_function=embeddings,persist_directory=persist_directory,)

        return vector_store

    except Exception as error:

        raise Exception(
            f"Failed to load vector store: {str(error)}"
        )


def delete_vector_store(session_id: str):

    try:

        persist_directory = os.path.join(
            VECTOR_DB_DIR,
            session_id,
        )

        if os.path.exists(persist_directory):
            shutil.rmtree(persist_directory)

        return True

    except Exception as error:

        raise Exception(
            f"Failed to delete vector store: {str(error)}"
        )