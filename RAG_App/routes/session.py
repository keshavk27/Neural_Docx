from fastapi import APIRouter, HTTPException

from services.vector_store import delete_session_vectors

router = APIRouter()


# Delete Session Vectors
@router.delete("/{sessionId}")
async def delete_session(sessionId: str):

    try:
        delete_session_vectors(sessionId)
        return {
            "success": True,
            "message": "Session vectors deleted successfully.",
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )