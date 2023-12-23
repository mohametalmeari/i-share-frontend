import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createReply, fetchReplies } from '../redux/posts/commentSlice';

const ReplyForm = ({
  photoId, commentId, setShowReply, setReplies,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: 'What a comment!',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await dispatch(createReply({ formData, photoId, commentId }));
      setFormData({ content: '' });
      event.target.blur();
      setShowReply({ form: true, replies: true });
      setReplies((await dispatch(fetchReplies({ photoId, commentId }))).payload.replies);
    }
  };

  return (
    <form className="comment-form">
      <textarea
        className="input-field"
        type="text"
        value={formData.content}
        placeholder="Your reply ... "
        onChange={handleChange('content')}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};
export default ReplyForm;
ReplyForm.propTypes = {
  photoId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  setShowReply: PropTypes.func.isRequired,
  setReplies: PropTypes.func.isRequired,
};
