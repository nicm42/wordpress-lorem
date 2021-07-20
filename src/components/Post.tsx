import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  const fetchCake = async () => {
    const response = await fetch('/cake');
    const data = await response.json();
    console.log(data[0]);
  };

  useEffect(() => {
    if (post.title === 'Cupcake Ipsum') {
      fetchCake();
    }
  }, []);

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
