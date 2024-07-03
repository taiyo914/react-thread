import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const NewThread = ({posts, setPosts}) => {

  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{ //try{}の中でエラーが起こるとcatchにエラーが渡される

      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"title" : title})
      })

      // console.log(response.status); //ちゃんとfetchできたか確認用

      if (response.ok) {
        const createdThread = await response.json();
        setPosts([...posts, createdThread]); 
        navigate('/'); //ホーム画面に遷移する
      } else {
        console.error('Failed to create thread');
      }
    
    }catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="newThread content">
      <h1>新しいスレッドを作りましょう</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewThread;