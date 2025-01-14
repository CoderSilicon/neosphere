"use client";
import React, { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyCLpDdt4VIp9wSdb04LpmebNLKbewp7eLs");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const Home = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(input);
      setLoading(false);
      setOutput([...output, result.response.text()]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-800">
      <div className="mx-4 my-6">
        <h1 className="text-5xl text-slate-100 font-bold text-center text-primary lexend-600">
          NeoSphere
        </h1>
      </div>
      <div className="w-full max-w-2xl shadow-2xl bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg">
        <div className="h-[60vh] rounded-md border-2 p-4 m-4 overflow-y-scroll">
          <div className="space-y-4 lexend-400">
            <div className="p-3 rounded-lg bg-gray-700 text-slate-50">
              <p>Welcome to NeoSphere!</p>
            </div>
            {loading && (
              <div className="p-3 rounded-lg bg-gray-700 text-slate-50 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            )}
            {output.map((message, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-gray-700 text-slate-50"
              >
                <p>{message}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4 p-4 lexend-300">
          <input
            className="w-full p-2 rounded-md bg-gray-700 text-white text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Search what comes to your mind?"
          />
          <button
            onClick={handleClick}
            className="w-full py-2 rounded-md bg-primary text-white flex items-center justify-center"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
