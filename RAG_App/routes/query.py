from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from services.vector_store import load_vector_store
from services.rag_chain import (create_rag_chain,ask_question)

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str


class QueryRequest(BaseModel):
    sessionId: str
    question: str
    history: List[ChatMessage] = []


@router.post("/ask")
async def query_documents(request: QueryRequest):

    try:

        # Load vector store
        vector_store = load_vector_store(request.sessionId)
        retriever = vector_store.as_retriever()

        # Create RAG chain

        rag_chain = create_rag_chain(retriever)
        
        
        # Generate answer
        response = ask_question(
            rag_chain=rag_chain,
            question=request.question,
            history=[
                message.model_dump()
                for message in request.history
            ],
        )

        return {
            "success": True,
            "answer": response["answer"],
            "citations":[],
            "metadata":{}
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )