import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createReply } from '../redux/posts/commentSlice';

const ReplyForm = ({ photoId, commentId, setShowReply }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: 'What a comment!',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleReply = async () => {
    await dispatch(createReply({ formData, photoId, commentId }));
    // dispatch(fetchComments(photoId));
    setShowReply({ form: true, replies: true });
  };
  return (
    <>
      <input
        type="text"
        value={formData.content}
        placeholder="Your reply ... "
        onChange={handleChange('content')}
      />
      <button type="button" onClick={handleReply}>
        reply
      </button>
    </>
  );
};
export default ReplyForm;
ReplyForm.propTypes = {
  photoId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  setShowReply: PropTypes.func.isRequired,
};
