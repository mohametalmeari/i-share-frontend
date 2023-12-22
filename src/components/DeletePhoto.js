import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deletePhoto } from '../redux/posts/photoSlice';

const DeletePhoto = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const { payload } = await dispatch(deletePhoto(id));

      if (payload && payload.deleted) {
        navigate('/');
        console.log('deleted');
      } else {
        console.error('Deletion was not successful:', payload);
      }
    } catch (error) {
      console.error('An error occurred during deletion:', error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};
export default DeletePhoto;
DeletePhoto.propTypes = {
  id: PropTypes.number.isRequired,
};
