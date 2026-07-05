from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.vector_store import get_retriever
from services.rag_chain import (create_rag_chain,ask_question,)

router = APIRouter()


# Request Models
class ChatMessage(BaseModel):
    role: str
    content: str

class QueryRequest(BaseModel):
    sessionId: str
    question: str
    history: List[ChatMessage] = []


# Ask Question
@router.post("/ask")
async def query_documents(request: QueryRequest):
    try:
        
        # Create filtered retriever
        retriever = get_retriever( session_id=request.sessionId,)
        
        #Verify the retrieved doc
        docs = retriever.invoke(request.question)
        if len(docs) == 0:
            raise HTTPException(
                status_code=404,
                detail="No documents found for this session.",
            )
        

        # Build RAG Chain
        rag_chain = create_rag_chain( retriever=retriever,)
        

        # Ask Question
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
            "citations": [],
            "metadata": {},
        }
    
    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )