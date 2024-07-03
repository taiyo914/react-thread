import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=1');
      const data = await response.json();
      setPosts(data)
      console.log(data);
    };

    fetchPosts();
  },[]);

  return (
    <>
      <Header/>
      <ul className = "listBox">
        {posts.map(post => (
          <li key={post.id} className ="listItem">
              {post.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
