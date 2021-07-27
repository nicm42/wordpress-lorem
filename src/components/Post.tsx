import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Image from './Image';
import Loading from './Loading';
import getImages from '../utils/getImages';

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

  /* const fetchData = async (type: string) => {
    setStatus('loading');
    try {
      const response = await axios.get('/' + type);
      //console.log(response);
      const data = await response.data;
      //console.log(data[0]);
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
  }; */

  const getData = async (type: string) => {
    setStatus('loading');
    const response = await getImages(type);
    if (response === 'error' || !response) {
      setStatus('error');
    } else {
      setPhoto(response);
      setStatus('loaded');
    }
  };

  useEffect(() => {
    switch (post.title) {
      case 'Monty Python and the Holy Grail Fillerama':
        getData('knight');
        break;
      case 'Doctor Who Fillerama':
        getData('space');
        break;
      case 'Cat Ipsum':
        getData('cat');
        break;
      case 'Cupcake Ipsum':
        getData('cake');
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
