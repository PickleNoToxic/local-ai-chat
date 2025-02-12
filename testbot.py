from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = TextLoader("data_company.txt") 
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
texts = text_splitter.split_documents(documents)

embedding = OllamaEmbeddings(model="deepseek-r1:7b") 

vectorstore = FAISS.from_documents(texts, embedding)

llm = Ollama(model="deepseek-r1:7b") 
qa_chain = RetrievalQA.from_chain_type(llm, retriever=vectorstore.as_retriever())

query = "Apa itu StarInc?"
response = qa_chain.run(query)
print(response)
