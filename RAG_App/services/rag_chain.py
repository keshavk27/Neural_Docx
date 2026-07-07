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
    "You are a strict, intelligent assistant for document question answering.\n\n"
    "You must use ONLY the retrieved document context below to answer the user's question.\n\n"
    "CRITICAL RULE: If the answer cannot be found entirely within the provided context, "
    "you MUST refuse to answer and politely state: 'I can only answer questions based on the provided documents.' "
    "DO NOT use your internal knowledge, DO NOT search the web, and DO NOT guess.\n\n"
    "Keep the answer concise, accurate, and well formatted.\n"
    "CRITICAL FORMATTING RULE: You MUST wrap all mathematical formulas, equations, probabilities, and fractions in LaTeX delimiters. "
    "Use single dollar signs ($) for inline math (e.g., $P(A)$) and double dollar signs ($$) for standalone block math (e.g., $$x = y^2$$). "
    "DO NOT use backticks (`) or markdown code blocks around math formulas. "
    "Context:\n"
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

        if message["role"] in ["human","user"]:

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