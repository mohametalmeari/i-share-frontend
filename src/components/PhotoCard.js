import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import DeletePhoto from './DeletePhoto';
import ArchivePhoto from './ArchivePhoto';
import LikePhoto from './LikePhoto';

const PhotoCard = ({
  id, name, imageUrl, caption, likes, liked, control, navigator,
}) => (
  <div>
    <p>

      {name}
    </p>
    {navigator ? (
      <NavLink to={`photos/${id}`}>
        <img src={imageUrl} alt="i-share" />
      </NavLink>
    )
      : <img src={imageUrl} alt="i-share" />}
    <p>
      {caption}
    </p>
    <span>
      {likes}
    </span>
    <LikePhoto
      id={id}
      liked={liked}
    />
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
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  control: PropTypes.bool.isRequired,
  navigator: PropTypes.bool.isRequired,
};
