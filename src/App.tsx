import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
import Loading from './components/Loading';
import getPosts from './utils/getPosts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [show, setShow] = useState(false); // For the Toast hiding

  useEffect(() => {
    const getData = async () => {
      const response = await getPosts();
      //console.log(response);
      if (
        response === 'error' ||
        response.data === 'error' ||
        !response.data ||
        !response
      ) {
        setStatus('error');
      } else {
        //console.log(response.data);
        setPosts(response.data.posts);
        setStatus('loaded');
        setShow(true);
      }
    };
    getData();
  }, []);

  return (
    <main className="p-3">
      <h1 className="text-center pt-2 pb-2">Alternative Ipsum Posts</h1>
      {status === 'loading' ? <Loading /> : ''}
      <p className="text-danger text-center">
        {status === 'error' ? "Couldn't fetch posts" : ''}
      </p>

      {posts.map((post: any, index) => (
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
