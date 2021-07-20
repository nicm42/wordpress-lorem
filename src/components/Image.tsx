import PropTypes from 'prop-types';

interface IPhotoProps {
  photo: any;
}

const Image = ({ photo }: IPhotoProps) => {
  return (
    <div className="text-center">
      <img className="img-fluid" src={photo.link} alt={photo.alt} />
      <p className="small">
        Photo by <a href={photo.userLink}>{photo.userName}</a> on{' '}
        <a href="https://unsplash.com/?utm_source=wordpress_lorem&utm_medium=referral">
          Unsplash
        </a>
      </p>
    </div>
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
