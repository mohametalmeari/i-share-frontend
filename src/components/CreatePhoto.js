import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPhoto } from '../redux/posts/photoSlice';

const CreatePhoto = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.photo);
  const [formData, setFormData] = useState({
    caption: '',
    image_url: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCreatePhoto = async () => {
    await dispatch(createPhoto(formData));
    navigate('/');
  };

  if (isLoading) {
    return (
      <p>
        Creating Photo ...
      </p>
    );
  }
  return (
    <>
      <input
        className="input-field"
        type="text"
        value={formData.image_url}
        placeholder="image url ..."
        onChange={handleChange('image_url')}
      />
      <textarea
        className="input-field"
        type="text"
        value={formData.caption}
        placeholder="caption ..."
        onChange={handleChange('caption')}
      />
      <button className="form-btn" type="button" onClick={handleCreatePhoto}>
        Create Photo
      </button>
    </>
  );
};
export default CreatePhoto;
