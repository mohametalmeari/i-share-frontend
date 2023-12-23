import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { archivePhoto, deletePhoto, likePhoto } from '../redux/posts/photoSlice';
import {
  ArchiveIcon, ArchivedIcon, DeleteIcon, EmptyStarIcon, FilledStarIcon,
} from '../assets/icons';

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
    <div className="photo-card">
      <p>
        {name}
      </p>
      {navigator
        ? (
          <NavLink to={`photos/${id}`}>
            <img className="photo-img" src={imageUrl} alt="i-share" />
          </NavLink>
        )
        : (
          <div>
            <img className="photo-img" src={imageUrl} alt="i-share" />
          </div>
        )}
      <p>
        {caption}
      </p>

      <div className="control-container">
        <button className="icon-btn" type="button" onClick={handleLike}>
          {liked
            ? (<FilledStarIcon /> || 'Unlike')
            : (<EmptyStarIcon /> || 'Like')}
        </button>
        {control && (
        <>
          <button className="icon-btn" type="button" onClick={handleDelete}>
            {<DeleteIcon /> || 'delete'}
          </button>
          <button className="icon-btn" type="button" onClick={handleArchive}>
            {archive
              ? (<ArchivedIcon /> || 'Unarchive')
              : (<ArchiveIcon /> || 'Archive')}
          </button>
        </>
        )}
      </div>

      <span className="interaction-counts">
        {likes === 0
          ? 'No stars'
          : ''}
        {likes > 1
          ? `${likes} stars`
          : ''}
        {likes === 1
          ? 'One star'
          : ''}
      </span>
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
