import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteComment, likeReply } from '../redux/posts/commentSlice';

const ReplyCard = ({
  id, photoId, commentId, name, content, likes, liked, control,
}) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteComment({ id, photoId, commentId }));
  };
  const handleLike = async () => {
    dispatch(likeReply({
      id, photoId, commentId, liked,
    }));
  };
  return (
    <div>
      {id}
      ,
      {name}
      :
      {content}
      ,
      {likes}
      ,
      {liked}
      <button type="button" onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'}
      </button>
      {control && (
      <button type="button" onClick={handleDelete}>
        Delete reply
      </button>
      )}
      <br />
    </div>
  );
};

export default ReplyCard;

ReplyCard.propTypes = {
  id: PropTypes.number.isRequired,
  photoId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  control: PropTypes.bool.isRequired,
};
