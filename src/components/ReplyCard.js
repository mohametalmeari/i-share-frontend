import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteReply, likeReply } from '../redux/posts/commentSlice';

const ReplyCard = ({
  id, photoId, commentId, name, content, likes, liked, control,
}) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteReply({ id, photoId, commentId }));
  };
  const handleLike = async () => {
    dispatch(likeReply({
      id, photoId, commentId, liked,
    }));
  };
  return (
    <div>
      <div>
        <b>
          {name}
          {': '}
        </b>
        <span>
          {content}
        </span>
      </div>
      <div className="interaction-counts">
        <span>
          {`${likes} Likes`}
        </span>
      </div>
      <div className="comment-interact-container">
        <button className="link comment-interact" type="button" onClick={handleLike}>
          {liked ? 'Unlike' : 'Like'}
        </button>
        {control && (
        <>
          {' - '}
          <button className="link comment-interact" type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
        )}
      </div>
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
