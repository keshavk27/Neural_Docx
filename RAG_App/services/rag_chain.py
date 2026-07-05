from langchain_classic.chains import (create_history_aware_retriever,create_retrieval_chain,)
from langchain_classic.chains.combine_documents import (create_stuff_documents_chain,)
from langchain_core.prompts import (ChatPromptTemplate,MessagesPlaceholder,)
from langchain_core.messages import (HumanMessage,AIMessage,)
from services.llm import llm


# follow-up questions prompt

contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context from the previous conversation, "
    "rewrite the question so that it is completely standalone. "
    "Do NOT answer the question."
)

contextualize_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ]
)


# QA Prompt

qa_system_prompt = (
    "You are an intelligent assistant for document question answering.\n\n"
    "Use ONLY the retrieved document context to answer the user's question.\n\n"
    "If the answer is not available in the retrieved context, "
    "then only search on the web for the generic explanation otherwise use only document for searching answer.\n\n"
    "Keep the answer concise, accurate and well formatted.\n\n"
    "{context}"
)

qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", qa_system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ]
)


# Build RAG Chain

def create_rag_chain(retriever):

    history_aware_retriever = create_history_aware_retriever(llm,retriever,contextualize_prompt,)

    question_answer_chain = create_stuff_documents_chain(llm,qa_prompt,)

    rag_chain = create_retrieval_chain(history_aware_retriever,question_answer_chain,)

    return rag_chain


# Convert MongoDB History

def convert_chat_history(history):

    chat_history = []

    for message in history:

        if message["role"] == "human":

            chat_history.append(HumanMessage(content=message["content"]))

        elif message["role"] == "assistant":

            chat_history.append(AIMessage(content=message["content"]))

    return chat_history



# Ask Question
def ask_question(rag_chain,question: str,history: list,):

    chat_history = convert_chat_history(history)

    response = rag_chain.invoke(
        {
            "input": question,
            "chat_history": chat_history,
        }
    )
        
    answer=response["answer"]
    

    return {
        "answer": answer,
    }