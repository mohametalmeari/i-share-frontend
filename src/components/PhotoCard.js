import PropTypes from 'prop-types';
import DeletePhoto from './DeletePhoto';
import ArchivePhoto from './ArchivePhoto';

const PhotoCard = ({
  id, imageUrl, caption, user, control,
}) => (
  <div>
    <p>

      {user}
    </p>
    <img src={imageUrl} alt="" />
    <p>
      {caption}

    </p>
    {control && (
    <>
      <DeletePhoto
        id={id}
      />
      <ArchivePhoto
        id={id}
      />
    </>

    )}
  </div>
);
export default PhotoCard;

PhotoCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  caption: PropTypes.string,
  user: PropTypes.string.isRequired,
  control: PropTypes.bool,
};
PhotoCard.defaultProps = {
  imageUrl: 'default url',
  caption: 'default caption',
  control: false,
};
