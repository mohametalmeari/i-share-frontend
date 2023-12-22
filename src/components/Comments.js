import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { fetchComments } from '../redux/posts/commentSlice';

const Comments = ({ photoId }) => {
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(photoId));
    console.log('in comments: ', comments);
    console.log('-----');
  }, []);

  return (
    <>
      <CommentForm
        photoId={photoId}
      />

      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          name={comment.user.name}
          content={comment.content}
          likes={comment.likes}
          liked={comment.liked}
          control={comment.user.control}
        />
      ))}
    </>
  );
};
export default Comments;
Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
};
