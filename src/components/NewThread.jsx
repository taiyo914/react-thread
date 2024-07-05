import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const NewThread = ({threads, setThreads}) => {

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
        setThreads([...threads, createdThread]); 
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
      <h1 className = "newThreadTitle">Create a new Thread</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className ="textBox"
            placeholder="Enter the Title of the new Thread"
          />
        </label>
        <br/>
        <button type="submit" className="button">Create</button>
      </form>
    </div>
  );
};

export default NewThread;