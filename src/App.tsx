import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Loading from './components/Loading';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [show, setShow] = useState(false); // For the Toast hiding

  const fetchData = async () => {
    const link =
      'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true';
    // Uncomment below to test errors
    //const link = 'http://httpstat.us/404';
    try {
      const response = await fetch(link);

      const data = await response.json();
      setPosts(data.posts);
      setStatus('loaded');
      setShow(true);
      console.log(data.posts);
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-3">
      <h1 className="text-center pt-2 pb-2">Alternative Ipsum Posts</h1>
      {status === 'loading' ? <Loading /> : ''}
      <p className="text-danger text-center">
        {status === 'error' ? "Couldn't fetch posts" : ''}
      </p>

      {posts.map((post: any[], index) => (
        <Post post={post} key={post.ID} index={index} />
      ))}
      {status === 'loaded' ? (
        <ToastContainer position="top-end">
          <Toast
            bg="success"
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>Posts loaded!</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        ''
      )}
    </main>
  );
};

export default App;
