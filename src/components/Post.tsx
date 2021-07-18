import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          {post.title}
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body>{post.content}</Card.Body>
        </Accordion.Collapse>
      </Card>
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
