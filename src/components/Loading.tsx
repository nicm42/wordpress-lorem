import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
