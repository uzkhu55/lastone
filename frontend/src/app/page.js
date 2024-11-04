"use client";

import Play from "@/components/Play";
import React from "react";

function App() {
  return (
    <div className="flex flex-col bg-[#010026] h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Rowdies:wght@300;400;700&display=swap"
        rel="stylesheet"
      ></link>
      <div className="flex flex-row">
        <div className="p-4 flex-grow">
          <Play />
        </div>
      </div>
    </div>
  );
}

export default App;
