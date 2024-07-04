import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ThreadPosts = ({threads}) => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [thread_id, offset]);

  // const loadMorePosts = () => {
  //   setOffset((prevOffset) => prevOffset + 10);
  // };

  const handleNewPostSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: newPost }),
      });

      if (response.ok) {
        setNewPost('');
        // 新しい投稿を取得して更新
        const fetchUpdatedPosts = async () => {
          try {
            const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0`);
            const data = await response.json();
            setPosts(data.posts);
          } catch (error) {
            console.error('Error fetching updated posts:', error);
          }
        };
        fetchUpdatedPosts();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
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

      {/* <div className="center">
      <button onClick={loadMorePosts} className ="button">Load More Posts</button>
      </div> */}

      <form onSubmit={handleNewPostSubmit}>
        <div>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your post here..."
            required
          />
        </div>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default ThreadPosts;
