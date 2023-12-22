import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { archivePhoto, deletePhoto, likePhoto } from '../redux/posts/photoSlice';

const PhotoCard = ({
  id, name, imageUrl, caption, likes, liked, control, navigator, archive,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleArchive = () => {
    dispatch(archivePhoto(id));
  };
  const handleDelete = async () => {
    const { payload } = await dispatch(deletePhoto(id));
    if (payload && payload.deleted) {
      navigate('/');
    }
  };

  const handleLike = () => {
    dispatch(likePhoto({ id, liked }));
  };
  return (
    <div>
      <p>
        {name}
      </p>
      {navigator
        ? (
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
      <button type="button" onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'}
      </button>
      {control && (
      <>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
        <button type="button" onClick={handleArchive}>
          {archive ? 'Unarchive' : 'Archive'}
        </button>
      </>

      )}
    </div>
  );
};
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
  archive: PropTypes.bool,
};
PhotoCard.defaultProps = {
  archive: false,
};
