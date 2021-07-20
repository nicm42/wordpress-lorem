import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Image from './Image';
import dummyImage from '../dummy-image.json'; // uncomment to use dummy image json rather than querying API

interface IPostProps {
  post: any;
}

interface IPhoto {
  link: string;
  alt: string;
  userName: string;
  userLink: string;
}

const Post = ({ post }: IPostProps) => {
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState<IPhoto>({
    link: '',
    alt: '',
    userName: '',
    userLink: '',
  });

  const fetchCake = async () => {
    setStatus('loading');
    try {
      /* const response = await fetch('/cake');
    const data = await response.json();
    console.log(data[0]); */
      const data = dummyImage;
      const link = data[0].urls.thumb;
      const alt = data[0].alt_description;
      const userName = data[0].user.name;
      const userLink =
        data[0].user.links.html +
        '?utm_source=wordpress_lorem&utm_medium=referral';
      console.log(data[0]);
      setStatus('loaded');
      setPhoto({ link, alt, userName, userLink });
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (post.title === 'Cupcake Ipsum') {
      fetchCake();
    }
  }, [post.title]);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{post.title}</Accordion.Header>
        <Accordion.Body>
          {status === 'loading' ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            ''
          )}
          {status === 'loaded' ? <Image photo={photo} /> : ''}
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </Accordion.Body>
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
