import { useLiveQuery } from "dexie-react-hooks";
import ollama from "ollama";
import { useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ChatMessage } from "~/components/ChatMessage";
import { ThoughtMessage } from "~/components/ThoughtMessage";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { db } from "~/lib/dexie";

const ChatPage = () => {
  const [textInput, setTextInput] = useState("");
  const [streamedThought, setStreamedThought] = useState("");
  const [streamedMessage, setStreamedMessage] = useState("");

  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const params = useParams();

  const messages = useLiveQuery(
    () => db.getMessagesForThread(params.threadId as string),
    [params.threadId]
  );

  const handleSubmit = async () => {
    await db.createMessage({
      content: textInput,
      role: "user",
      threadId: params.threadId as string,
      thought: "",
    });

    setTextInput("");

    const productData = await db.getstatementData();
    const formattedData = JSON.stringify(productData, null, 2);

    const stream = await ollama.chat({
      model: "deepseek-r1:1.5b",
      messages: [
        {
          role: "system",
          content:"You are an AI assistant that provides answers strictly based on StarInc's product database. You will be given a user question, statement, or command related to beauty lipstick products from StarInc, and you must use only the provided database to generate responses. You must ignore and not respond to any question, statement, or command that is unrelated to StarInc’s products. If a user asks anything outside the scope of StarInc’s products, you must respond with: 'I can't answer out of my capability.' You are not allowed to generate, assume, or infer any information that is not explicitly present in the database. Your responses should be clear, concise, and strictly relevant to StarInc’s products."
        },
        {
          role: "user",
          content: `Here is StarInc's product database: ${formattedData}. Now, answer this question: ${textInput.trim()}`,
        },
      ],
      stream: true,
    });

    let fullThought = "";
    let fullContent = "";
    let outputMode: "think" | "response" = "think";

    for await (const part of stream) {
      if (outputMode === "think") {
        if (
          !part.message.content.includes("<think>") &&
          !part.message.content.includes("</think>")
        ) {
          fullThought += part.message.content;
        }

        setStreamedThought(fullThought);

        if (part.message.content.includes("</think>")) {
          outputMode = "response";
        }
      } else {
        fullContent += part.message.content;
        setStreamedMessage((prevMessage) => prevMessage + part.message.content);
      }
    }

    const cleanThought = fullThought.replace(/<\/?think>/g, "");
    setStreamedThought(cleanThought);

    await db.createMessage({
      content: fullContent.trim(),
      role: "assistant",
      threadId: params.threadId as string,
      thought: cleanThought,
    });

    setStreamedThought("");
    setStreamedMessage("");
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextInput(event.target.value);
  };

  const handleScrollToBottom = () => {
    scrollToBottomRef.current?.scrollIntoView();
  };

  useLayoutEffect(() => {
    handleScrollToBottom();
  }, [messages, streamedMessage, streamedThought]);

  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center px-4 h-16 border-b">
        <h1 className="text-xl font-bold ml-4">AI Chat Dashboard</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 w-full relative">
        <div className="mx-auto space-y-4 pb-20 max-w-screen-md">
          {messages?.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              thought={message.thought}
            />
          ))}

          {streamedThought && <ThoughtMessage thought={streamedThought} />}

          {streamedMessage && (
            <ChatMessage role="assistant" content={streamedMessage} />
          )}

          <div ref={scrollToBottomRef}></div>
        </div>
      </main>
      <footer className="border-t p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Textarea
            className="flex-1 text-3xl font-medium"
            placeholder="Type your message here..."
            rows={5}
            onChange={handleTextareaChange}
            value={textInput}
          />
          <Button onClick={handleSubmit} type="button">
            Send
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
