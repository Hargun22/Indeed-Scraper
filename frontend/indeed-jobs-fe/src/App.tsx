import React from "react";
import Home from "./Home";
import Jobs from "./Jobs";

function App() {
  return (
    <div className="bg-slate-500 min-h-[100vh] px-4 sm:px-20">
      <div className="flex flex-col items-center justify-center">
        <Home />
        <Jobs />
      </div>
    </div>
  );
}

export default App;
