import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  deleteComment, fetchComments, fetchReplies, likeComment,
} from '../redux/posts/commentSlice';
import ReplyCard from './ReplyCard';
import ReplyForm from './ReplyForm';

const CommentCard = ({
  id, photoId, name, content, likes, liked, control,
}) => {
  const [showReply, setShowReply] = useState({ form: false, replies: false });
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteComment({ id, photoId }));
    dispatch(fetchComments(photoId));
  };

  const { replies } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(fetchReplies({ photoId, commentId: id }));
    console.log('replies', replies);
    console.log('-----');
  }, []);

  const toggleShowReplyForm = () => {
    setShowReply({ ...showReply, form: !showReply.form });
  };

  const toggleShowReplies = () => {
    setShowReply({ ...showReply, replies: !showReply.replies });
  };
  const handleLike = async () => {
    dispatch(likeComment({ id, photoId, liked }));
  };
  return (
    <>
      {id}
      ,
      {name}
      :
      {content}
      ,
      {likes}
      ,
      <button type="button" onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'}
      </button>

      <button type="button" onClick={toggleShowReplyForm}>
        Reply from
      </button>
      {showReply.form && (
        <ReplyForm
          photoId={photoId}
          commentId={id}
          setShowReply={setShowReply}
        />
      )}

      <button type="button" onClick={toggleShowReplies}>
        Show replies
      </button>
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

      {control && (
      <button type="button" onClick={handleDelete}>
        Delete comment
      </button>
      )}
      <br />
    </>
  );
};

export default CommentCard;

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  photoId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  control: PropTypes.bool.isRequired,
};
