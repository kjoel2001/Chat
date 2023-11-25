import { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3001");
const socket = io("/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", receiveMessage)

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages(state => [message, ...state]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages(state => [newMessage, ...state]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <div className="h-screen bg-gray-200 flex">
      <div className="w-1/4 bg-white border h-full overflow-y-auto">
        {/* Espacio para la lista de contactos */}
        <ul>
          {/* Aquí puedes listar los contactos */}
          <li className="p-4 border-b">Contacto 1</li>
          <li className="p-4 border-b">Contacto 2</li>
          <li className="p-4 border-b">Contacto 3</li>
          {/* ... */}
        </ul>
      </div>
  
      <div className="w-3/4 bg-white border h-full flex flex-col">
        {/* Espacio para el chat */}
        <div className="flex-grow overflow-y-auto">
          {/* Espacio para la lista de mensajes */}
          <ul>
            {messages.slice(0).reverse().map((message, index) => (
              <li
                key={index}
                className={`p-2 text-sm ${
                  message.from === "Me" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.from === "Me" ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {message.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Espacio para escribir el mensaje */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <input
            name="message"
            type="text"
            placeholder="Escribe tu mensaje"
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded p-2 w-full"
            value={message}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
  
  
  
  
}
