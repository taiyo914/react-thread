import React, { useState, useEffect,useCallback } from 'react';
import { useParams } from 'react-router-dom';

const ThreadPosts = ({threads}) => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newPost, setNewPost] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  //offsetを指定するとそこから10個のコメントを取得し、それを返す関数
  const fetchPosts = useCallback(async (newOffset) => {
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${newOffset}`);
      const data = await response.json();
      return data.posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },[thread_id]);

  //初回レンダリング時のコメントの取得
  useEffect(() => {
    const loadPosts = async () => {
      const initialPosts = await fetchPosts(0);
      setPosts(initialPosts);

      //次のコメント10個の有無でisNextDisabledを設定
      const nextPosts = await fetchPosts(10);
      setIsNextDisabled(nextPosts.length === 0);
    };
    loadPosts();
  }, [fetchPosts]);

  //新しい投稿をPOSTし、最新の状態を再び取得して表示させる関数
  const handleNewPostSubmit = async (event) => {
    event.preventDefault();

    try {
      //1.入力されたコメントをPOST
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: newPost }),
      });
      //2.コメント欄をリセットし、新しい投稿をoffset=0で取得し、offsetを0に戻す
      if (response.ok) {
        setNewPost('');
        const updatedPosts = await fetchPosts(0);
        setPosts(updatedPosts);
        setOffset(0);

        //次のコメント10個の有無でisNextDisabledを設定
        const nextPosts = await fetchPosts(10);
        setIsNextDisabled(nextPosts.length === 0);
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleNext = async () => {
    const newOffset = offset + 10;
    const fetchedPosts = await fetchPosts(newOffset);
    setPosts(fetchedPosts);
    setOffset(newOffset);

    //次のコメント10個の有無でisNextDisabledを設定
    const nextPosts = await fetchPosts(newOffset + 10);
    setIsNextDisabled(nextPosts.length === 0);
  };

  const handleBack = async () => {
    if (offset > 0) {
      const newOffset = offset - 10;
      const fetchedPosts = await fetchPosts(newOffset);

      setPosts(fetchedPosts);
      setOffset(newOffset);

      //次のコメント10個の有無でisNextDisabledを設定
      const nextPosts = await fetchPosts(newOffset + 10);
      setIsNextDisabled(nextPosts.length === 0);
    }
  };

  const thisThread = threads.find(thread => thread.id === thread_id)

  return (
    <div>
      <div className="threadsContainer">
        <p className="smallThreadTitle">Thread's Title :</p>
        <h1 className="threadTitle">{thisThread.title}</h1>
        {posts.map((post) => (
          <div key={post.id} className ="post">
            <p>{post.post}</p>
          </div>
        ))}
      </div>
      <div className="center">
        <button onClick={handleBack} disabled={offset === 0} className="buttonBack">Back</button>
        <button onClick={handleNext} disabled={isNextDisabled} className="buttonNext">Next</button>
        <h2 className="CommentTitile">Write your Comment</h2>
        <form onSubmit={handleNewPostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your post here..."
            required
            className="postTextBox"
            />
          <button type="submit" className='button comment'>Submit Post</button>
        </form>
      </div>
    </div>
  );
};

export default ThreadPosts;
