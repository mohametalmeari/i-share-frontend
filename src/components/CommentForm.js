import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createComment, fetchComments } from '../redux/posts/commentSlice';

const CommentForm = ({ photoId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await dispatch(createComment({ formData, photoId }));
      dispatch(fetchComments(photoId));
      setFormData({ content: '' });
      event.target.blur();
    }
  };
  return (
    <form className="comment-form">
      <textarea
        className="input-field"
        value={formData.content}
        placeholder="Your comment ... "
        onChange={handleChange('content')}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};
export default CommentForm;
CommentForm.propTypes = {
  photoId: PropTypes.number.isRequired,
};
