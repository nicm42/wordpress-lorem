import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Image from './Image';
import Loading from './Loading';
import dummyImage from '../dummyData/dummy-image.json'; // uncomment to use dummy image json rather than querying API

interface IPostProps {
  post: any;
  index: number;
}

interface IPhoto {
  link: string;
  alt: string;
  userName: string;
  userLink: string;
}

const Post = ({ post, index }: IPostProps) => {
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState<IPhoto>({
    link: '',
    alt: '',
    userName: '',
    userLink: '',
  });

  const fetchData = async (type: string) => {
    setStatus('loading');
    try {
      const response = await axios.get('/' + type);
      console.log(response);
      const data = await response.data;
      console.log(data[0]);
      //const data = dummyImage;
      const link = data[0].urls.thumb;
      const alt = data[0].alt_description;
      const userName = data[0].user.name;
      const userLink =
        data[0].user.links.html +
        '?utm_source=wordpress_lorem&utm_medium=referral';
      setStatus('loaded');
      setPhoto({ link, alt, userName, userLink });
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  useEffect(() => {
    switch (post.title) {
      case 'Monty Python and the Holy Grail Fillerama':
        fetchData('knight');
        break;
      case 'Doctor Who Fillerama':
        fetchData('space');
        break;
      case 'Cat Ipsum':
        fetchData('cat');
        break;
      case 'Cupcake Ipsum':
        fetchData('cake');
        break;
      default:
        return;
    }
  }, [post.title]);

  return (
    <Accordion className="p-1 container-sm">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{post.title}</Accordion.Header>
        <Accordion.Body className="col-sm-9">
          {status === 'loading' ? <Loading /> : ''}
          {status === 'loaded' ? <Image photo={photo} index={index} /> : ''}
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
