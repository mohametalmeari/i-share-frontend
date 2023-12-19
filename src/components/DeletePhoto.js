import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePhoto } from '../redux/posts/photoSlice';

const DeletePhoto = ({ id }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(deletePhoto(id));
  };
  return (
    <>
      <button type="button" onClick={handleLogout}>
        Delete
      </button>
    </>
  );
};
export default DeletePhoto;
DeletePhoto.propTypes = {
  id: PropTypes.number.isRequired,
};
