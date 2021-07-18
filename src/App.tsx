import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const link =
          'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true';
        const request = await fetch(link);
        if (request.ok) {
          const data = await request.json();
          console.log(data.posts[0].title);
          console.log(data.posts[0].content);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Post />
    </>
  );
};

export default App;
