import './App.css';
import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import  Home  from "./components/Home.jsx";
import  NewThread  from "./components/NewThread.jsx";
import ThreadPosts from './components/ThreadPosts.jsx';

function App() {

  const [threads, setThreads] = useState([]);

  return (
    <BrowserRouter>
      <nav className="Navi">
        <div className="wrapper">
          <Link to="/">Home</Link>
          <Link to="/threads/new">New Thread</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home threads={threads} setThreads={setThreads}/>} />
        <Route path="/threads/new" element={<NewThread threads={threads} setThreads={setThreads}/>} />
        <Route path="/threads/:thread_id" element={<ThreadPosts threads={threads} setThreads={setThreads}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
