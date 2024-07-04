import { useEffect } from "react";
import { Link } from "react-router-dom";
const Home = ({threads, setThreads}) => {

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads');
      const data = await response.json();
      setThreads(data)
      //console.log(data) //ちゃんとdataが取得できたか確認用
    };

    fetchPosts();
  },[setThreads]); //依存配列はなくても大丈夫だけどなんか警告でてきたから一応入れといた。

  return (
    <>
    <h1 className="title">Thraeds</h1>
    <ul className = "threadContainer">
      {threads.map(thread => (
        <Link to = {`/threads/${thread.id}`} key={thread.id} className ="threadItem">
          <li>
              {thread.title}
          </li>
        </Link>
      ))}
    </ul>
    </>
  );
};

export default Home;