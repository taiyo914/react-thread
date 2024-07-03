import { useEffect } from "react";
const Home = ({posts, setPosts}) => {

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads');
      const data = await response.json();
      setPosts(data)
      //console.log(data) //ちゃんとdataが取得できたか確認用
    };

    fetchPosts();
  },[setPosts]); //依存配列はなくても大丈夫だけどなんか警告でてきたから一応入れといた。

  return (
    <>
    <ul className = "listBox">
      {posts.map(post => (
        <li key={post.id} className ="listItem">
            {post.title}
        </li>
      ))}
    </ul>
    </>
  );
};

export default Home;