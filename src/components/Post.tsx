import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
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

//Photo by <a href="https://unsplash.com/@anniespratt?utm_source=your_app_name&utm_medium=referral">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
//<Accordion.Body dangerouslySetInnerHTM={{ __html: post.content}}>

const Post = ({ post }: IPostProps) => {
  const [photo, setPhoto] = useState<IPhoto>({
    link: '',
    alt: '',
    userName: '',
    userLink: '',
  });

  const fetchCake = async () => {
    /* const response = await fetch('/cake');
    const data = await response.json();
    console.log(data[0]); */
    const data = dummyImage;
    const link = data[0].urls.small;
    const alt = data[0].alt_description;
    const userName = data[0].user.name;
    const userLink =
      data[0].user.links.html +
      '?utm_source=wordpress_lorem&utm_medium=referral';
    console.log(data[0]);
    setPhoto({ link, alt, userName, userLink });
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
        <Accordion.Body>
          <div className="text-center">
            <img className="img-fluid" src={photo.link} alt={photo.alt} />
            <p className="small">
              Photo by{' '}
              <a href={photo.userLink}>
                {photo.userName} on
                <a href="https://unsplash.com/?utm_source=wordpress_lorem&utm_medium=referral">
                  Unsplash
                </a>
              </a>
            </p>
          </div>
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
