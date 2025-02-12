from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load the document
file_path = "pythonhehe/data_company.txt"
loader = TextLoader(file_path)
documents = loader.load()

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

word_count = len(text.split())  # Count words
char_count = len(text)  
token_estimate = char_count / 7  
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

text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
texts = text_splitter.split_documents(documents)
embedding = OllamaEmbeddings(model="nomic-embed-text") 

vectorstore = FAISS.from_documents(texts, embedding)

llm = Ollama(model="deepseek-r1:8b") 
qa_chain = RetrievalQA.from_chain_type(llm, retriever=vectorstore.as_retriever())

# query = "Apa itu StarInc?"
while True:
    query = input("Masukkan pertanyaan: ")
    prompt = f"Jawab dalam bahasa Indonesia: {query}"
    response = qa_chain.run(prompt)
    print(response)
