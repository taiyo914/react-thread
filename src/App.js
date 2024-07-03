import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import './App.css';
// import Header from './Header';
import  Home  from "./components/Home.jsx";
import  NewThread  from "./components/NewThread.jsx";

function App() {

  const [posts, setPosts] = useState([]);

  return (
    <BrowserRouter>
      <div className="Navi">
        <div className="wrapper">
          <Link to="/">Home</Link>
          <Link to="/threads/new">New Thread</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts}/>} />
        <Route path="/threads/new" element={<NewThread posts={posts} setPosts={setPosts}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
