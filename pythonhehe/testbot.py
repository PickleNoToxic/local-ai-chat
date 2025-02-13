import os
import sys
import time
import threading
from langchain.docstore.document import Document
from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Folder tempat menyimpan file teks
folder_path = "pythonhehe/datacompany"

documents = []
# Load all text files from the directory
for filename in os.listdir(folder_path):
    if filename.endswith(".txt"):
        file_path = os.path.join(folder_path, filename)
        loader = TextLoader(file_path, encoding="utf-8")
        docs = loader.load()

        # Tambahkan metadata, misalnya kategori "produk"
        for doc in docs:
            doc.metadata["category"] = "produk" if "product" in filename.lower() else "general"
        
        documents.extend(docs)

# Menggabungkan semua teks untuk menghitung ukuran optimal
all_text = "\n".join([doc.page_content for doc in documents])
char_count = len(all_text)
    
chunk_size = int(char_count * 0.3)
chunk_overlap = int(char_count * 0.1)

print(f"Optimal chunk size: {chunk_size}, Chunk overlap: {chunk_overlap}")

# Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
texts = text_splitter.split_documents(documents)

# Initialize embeddings and vector store
embedding = OllamaEmbeddings(model="nomic-embed-text") 
vectorstore = FAISS.from_documents(texts, embedding)
# vectorstore.index.normalize_L2()


# Load LLM model
llm = Ollama(model="gemma2:9b") 
retriever = vectorstore.as_retriever(search_kwargs={"k": 50, "filter": {"category": "produk"}})

qa_chain = RetrievalQA.from_chain_type(llm, retriever=retriever)

# Function to animate "Loading..."
loading = True


def run_query(query):
    prompt = f"Anda adalah sebuah asisten chatbot yang bertugas untuk menjawab pertanyaan berdasarkan teks yang telah diberikan. Teks tersebut berisi informasi tentang perusahaan StarInc. Ini adalah pertanyaan yang akan Anda jawab: {query}. Jika tidak ada jawaban di dalam database, jawab: 'Maaf, saya tidak bisa menjawab di luar kemampuan saya. Silahkan hubungi pihak yang terkait untuk informasi lebih lanjut.' "
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