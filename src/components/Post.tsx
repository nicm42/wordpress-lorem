import PropTypes from 'prop-types';
//import { Accordion, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
//import Card from 'react-bootstrap/Card';

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{post.title}</Accordion.Header>
        <Accordion.Body
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    ID: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default Post;
