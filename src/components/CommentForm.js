import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createComment } from '../redux/posts/commentSlice';

const CommentForm = ({ photoId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: 'I love it!',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleComment = async () => {
    dispatch(createComment({ formData, photoId }));
  };
  return (
    <>
      <input
        type="text"
        value={formData.content}
        placeholder="Your comment ... "
        onChange={handleChange('content')}
      />
      <button type="button" onClick={handleComment}>
        comment
      </button>
    </>
  );
};
export default CommentForm;
CommentForm.propTypes = {
  photoId: PropTypes.number.isRequired,
};
