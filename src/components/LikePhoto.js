import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { likePhoto } from '../redux/posts/photoSlice';

const LikePhoto = ({ id, liked }) => {
  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(likePhoto({ id, liked }));
  };
  return (
    <>
      <button type="button" onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'}
      </button>
    </>
  );
};
export default LikePhoto;
LikePhoto.propTypes = {
  id: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
};
