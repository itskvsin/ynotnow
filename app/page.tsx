"use client";
import { useState, useEffect } from "react";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LastBg from "@/components/LastBg";
import Navbar from "@/components/Navbar";
import { ReactLenis, useLenis } from "lenis/react";
import Reveal from "@/components/effects/Reveal";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "admin";
  const storageKey = "pageAuth";

  useEffect(() => {
    const savedAuth = localStorage.getItem(storageKey);
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem(storageKey, "true");
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-[#111] p-8 rounded-2xl shadow-lg w-80"
        >
          <h2 className="text-2xl mb-4 text-center font-semibold">
            Enter Password
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded-md bg-gray-800 text-white mb-4 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-md font-bold transition"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.2 }}>
      <Reveal>
        {/* <Navbar /> */}
        <Hero />
        <About />
        <LastBg />
        <Footer />
      </Reveal>
    </ReactLenis>
  );
}
