from fastapi import APIRouter, HTTPException
from services.vector_store import delete_vector_store

router = APIRouter()


@router.delete("/{sessionId}")
async def delete_session(sessionId: str):
    try:
        #Delete vector store
        delete_vector_store(sessionId)

        return {
            "success": True,
            "message": "Vector store deleted successfully.",
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
        
        
# TOdo: for now vectordb will not be deleted due to window32 restrictions, 
# later it will be shifted to quadrant so there will be now issue