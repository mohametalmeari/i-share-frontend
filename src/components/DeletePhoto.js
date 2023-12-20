import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePhoto } from '../redux/posts/photoSlice';

const DeletePhoto = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deletePhoto(id));
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
