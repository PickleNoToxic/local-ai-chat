import sys
import time
import threading
from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load the document
file_path = "pythonhehe/data_company.txt"
loader = TextLoader(file_path, encoding="utf-8")
documents = loader.load()

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Estimate token count and set chunk size dynamically
char_count = len(text)
token_estimate = char_count / 5

if token_estimate <= 1000:
    chunk_size = 500
    chunk_overlap = 100
elif token_estimate <= 2000:
    chunk_size = 800
    chunk_overlap = 200
elif token_estimate <= 4000:
    chunk_size = 1200
    chunk_overlap = 300
else:
    chunk_size = 1500  
    chunk_overlap = 400

print(f"Optimal chunk size: {chunk_size}, Chunk overlap: {chunk_overlap}")

# Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
texts = text_splitter.split_documents(documents)

# Initialize embeddings and vector store
embedding = OllamaEmbeddings(model="nomic-embed-text") 
vectorstore = FAISS.from_documents(texts, embedding)

# Load LLM model
llm = Ollama(model="deepseek-r1:7b") 
qa_chain = RetrievalQA.from_chain_type(llm, retriever=vectorstore.as_retriever())

# Function to animate "Loading..."
loading = True


def run_query(query):
    prompt = f"Jawab dalam bahasa Indonesia: {query}"
    return qa_chain.run(prompt)


def animate_loading():
    global loading
    symbols = [".  ", ".. ", "..."]
    i = 0
    while loading:
        sys.stdout.write(f"\rLoading{symbols[i]}")
        sys.stdout.flush()
        i = (i + 1) % len(symbols)
        time.sleep(0.5)
    sys.stdout.write("\r" + " " * 10 + "\r")  # Clear loading text

# Main loop to handle user queries
while True:
    query = input("Masukkan pertanyaan: ")
    if query.lower() in ["exit", "quit"]:
        break

    # Start loading animation in a separate thread
    loading = True
    loading_thread = threading.Thread(target=animate_loading)
    loading_thread.start()

    # Run AI query
    prompt = f"Jawab dalam bahasa Indonesia: {query}"
    response = qa_chain.run(prompt)

    # Stop loading animation
    loading = False
    loading_thread.join()

    # Print AI response
    print(response)