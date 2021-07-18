import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const link =
        'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true';
      const request = await fetch(link);
      if (request.ok) {
        const data = await request.json();
        setPosts(data.posts);
        console.log(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h1>Alternative Ipsum Posts</h1>
      {posts.map((post: any[]) => (
        <Post post={post} key={post.ID} />
      ))}
    </main>
  );
};

export default App;
