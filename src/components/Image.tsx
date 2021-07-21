import PropTypes from 'prop-types';

interface IPhotoProps {
  photo: any;
}

const Image = ({ photo }: IPhotoProps) => {
  return (
    <figure className="figure text-center">
      <img className="figure-img img-fluid" src={photo.link} alt={photo.alt} />
      <figcaption className="figure-caption">
        Photo by <a href={photo.userLink}>{photo.userName}</a> on{' '}
        <a href="https://unsplash.com/?utm_source=wordpress_lorem&utm_medium=referral">
          Unsplash
        </a>
      </figcaption>
    </figure>
  );
};

Image.propTypes = {
  photo: PropTypes.shape({
    link: PropTypes.string,
    alt: PropTypes.string,
    userName: PropTypes.string,
    userLink: PropTypes.string,
  }),
};

export default Image;