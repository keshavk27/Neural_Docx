import os

from dotenv import load_dotenv

from qdrant_client import QdrantClient
from qdrant_client.models import (Distance,VectorParams,PayloadSchemaType, Filter, FieldCondition, MatchValue,PointIdsList,)

from langchain_qdrant import QdrantVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter

from services.embeddings import embeddings

load_dotenv()


# Configuration
CHUNK_SIZE = 5000
CHUNK_OVERLAP = 200

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

COLLECTION_NAME = os.getenv("QDRANT_COLLECTION","neural_docx_openai",)

VECTOR_SIZE = int(os.getenv("EMBEDDING_DIMENSION", "3072"))


# Client
client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY,)


# Collection
def ensure_collection():
    collections = client.get_collections().collections
    exists = any(collection.name == COLLECTION_NAME for collection in collections)
    if not exists:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=VECTOR_SIZE,
                distance=Distance.COSINE,
            ),
        )

    # Create payload indexes
    client.create_payload_index(
        collection_name=COLLECTION_NAME,
        field_name="metadata.session_id",
        field_schema=PayloadSchemaType.KEYWORD,
    )
    client.create_payload_index(
        collection_name=COLLECTION_NAME,
        field_name="metadata.document_id",
        field_schema=PayloadSchemaType.KEYWORD,
    )
    client.create_payload_index(
        collection_name=COLLECTION_NAME,
        field_name="metadata.user_id",
        field_schema=PayloadSchemaType.KEYWORD,
    )


# Split Documents
def split_documents(documents):
    splitter = RecursiveCharacterTextSplitter( chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP,)
    return splitter.split_documents(documents)

#vector store helper
def get_vector_store():
    ensure_collection()

    return QdrantVectorStore(
        client=client,
        collection_name=COLLECTION_NAME,
        embedding=embeddings,
    )
    
    
# Add Documents    
def add_documents(*,documents,session_id,document_id,file_name,user_id=None):
    try:
        ensure_collection()
        splits = split_documents(documents)
        for index, document in enumerate(splits):
            document.metadata.update(
                {
                    "user_id": user_id,
                    "session_id": session_id,
                    "document_id": document_id,
                    "file_name": file_name,
                    "chunk_index": index,
                }
            )

        vector_store = get_vector_store()
        vector_store.add_documents(splits)
        return True

    except Exception as error:
        raise Exception( f"Failed to add documents: {error}")


# Get Retriever
def get_retriever(session_id):
    try:
        ensure_collection()
        vector_store = get_vector_store()
        retriever = vector_store.as_retriever(
            search_kwargs={
                "k": 6,
                "filter": Filter(
                    must=[
                        FieldCondition(
                            key="metadata.session_id",
                            match=MatchValue(value=session_id,),
                        )
                    ]
                ),
            }
        )
        return retriever

    except Exception as error:
        raise Exception(f"Failed to create retriever: {error}")


# Delete Session
def delete_session_vectors(session_id):
    try:
        ensure_collection()
        client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="metadata.session_id",
                        match=MatchValue( value=session_id,),
                    )
                ]
            ),
        )
        return True
    except Exception as error:

        raise Exception(f"Failed to delete session vectors: {error}")


# Delete Document
def delete_document_vectors(document_id):
    try:
        ensure_collection()
        client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="metadata.document_id",
                        match=MatchValue(
                            value=document_id,
                        ),
                    )
                ]
            ),
        )
        return True

    except Exception as error:
        raise Exception(f"Failed to delete document vectors: {error}" )