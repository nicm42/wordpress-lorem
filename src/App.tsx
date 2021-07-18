import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [show, setShow] = useState(false); // For the Toast hiding

  const fetchData = async () => {
    try {
      const link =
        'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true';
      const request = await fetch(link);
      if (request.ok) {
        const data = await request.json();
        setPosts(data.posts);
        setStatus('loaded');
        setShow(true);
        console.log(data.posts);
      }
    } catch (error) {
      console.log(error);
      setStatus(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h1>Alternative Ipsum Posts</h1>
      {status === 'loading' ? (
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        ''
      )}
      {status === 'error' ? { status } : ''}
      {posts.map((post: any[]) => (
        <Post post={post} key={post.ID} />
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
