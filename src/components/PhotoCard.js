import PropTypes from 'prop-types';
import DeletePhoto from './DeletePhoto';
import ArchivePhoto from './ArchivePhoto';

const PhotoCard = ({ id, imageUrl, user }) => (
  <div>
    {id}
    ,
    {imageUrl}
    ,
    {user}
    <DeletePhoto
      id={id}
    />
    <ArchivePhoto
      id={id}
    />
  </div>
);
export default PhotoCard;

PhotoCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  user: PropTypes.string.isRequired,
};
PhotoCard.defaultProps = {
  imageUrl: 'default url',
};
