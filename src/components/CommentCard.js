import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  deleteComment, fetchComments, fetchReplies, likeComment,
} from '../redux/posts/commentSlice';
import ReplyCard from './ReplyCard';
import ReplyForm from './ReplyForm';

const CommentCard = ({
  id, photoId, name, content, likes, liked, control, repliesCount,
}) => {
  const [showReply, setShowReply] = useState({ form: false, replies: false });
  const [replies, setReplies] = useState([]);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteComment({ id, photoId }));
    dispatch(fetchComments(photoId));
  };

  const toggleShowReplyForm = () => {
    setShowReply({ ...showReply, form: !showReply.form });
  };

  const toggleShowReplies = async () => {
    if (!showReply.replies) {
      setReplies((await dispatch(fetchReplies({ photoId, commentId: id }))).payload.replies);
    }
    setShowReply({ ...showReply, replies: !showReply.replies });
  };
  const handleLike = async () => {
    dispatch(likeComment({ id, photoId, liked }));
  };
  return (
    <div className="comment-container">
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
          {`${likes} Likes, `}
        </span>
        <span>
          {`${repliesCount} Replies`}
        </span>
      </div>
      <div className="comment-interact-container">
        <button className="link comment-interact" type="button" onClick={handleLike}>
          {liked ? 'Unlike' : 'Like'}
        </button>
        {' - '}
        <button className="link comment-interact" type="button" onClick={toggleShowReplyForm}>
          Reply
        </button>
        {repliesCount !== 0 && (
          <>
            {' - '}
            <button className="link comment-interact" type="button" onClick={toggleShowReplies}>
              {!showReply.replies
                ? 'Show replies'
                : 'Hide replies'}
            </button>
          </>
        )}
        {control && (
        <>
          {' - '}
          <button className="link comment-interact" type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
        )}
      </div>
      {showReply.form && (
      <ReplyForm
        photoId={photoId}
        commentId={id}
        setShowReply={setShowReply}
        setReplies={setReplies}
      />
      )}
      {showReply.replies && replies.map((reply) => (
        <ReplyCard
          key={reply.id}
          id={reply.id}
          photoId={photoId}
          commentId={id}
          name={reply.user.name}
          content={reply.content}
          likes={reply.likes}
          liked={reply.liked}
          control={reply.user.control}
        />
      ))}
    </div>
  );
};

export default CommentCard;

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  photoId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  repliesCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  control: PropTypes.bool.isRequired,
};
