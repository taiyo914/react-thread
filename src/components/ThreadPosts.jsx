import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ThreadPosts = ({threads, setThreads}) => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`);
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [thread_id, offset]);

  const loadMorePosts = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const thisThread = threads.find(thread => thread.id === thread_id)

  return (
    <div>
      <div className="threadsContainer">
        <p className="smallThreadTitle">Thread's Title :</p>
        <h1 className="threadTitle">{thisThread.title}</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.post}</p>
          </div>
        ))}
      </div>
      <div className="center">
      <button onClick={loadMorePosts} className ="button">Load More Posts</button>
      </div>
    </div>
  );
};

export default ThreadPosts;
