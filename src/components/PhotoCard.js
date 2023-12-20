import PropTypes from 'prop-types';
import DeletePhoto from './DeletePhoto';
import ArchivePhoto from './ArchivePhoto';
import LikePhoto from './LikePhoto';

const PhotoCard = ({
  id, photo,
}) => (
  <div>
    <p>

      {photo.user.name}
    </p>
    <img src={photo.image_url} alt="" />
    <p>
      {photo.caption}
    </p>
    <span>
      {photo.likes}
    </span>
    <LikePhoto
      id={id}
      liked={photo.liked}
    />
    {photo.user.control && (
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
  photo: PropTypes.isRequired,
};
