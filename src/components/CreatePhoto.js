import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPhoto } from '../redux/posts/photoSlice';

const CreatePhoto = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    caption: 'a new image',
    image_url: 'a new image url',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCreatePhoto = async () => {
    await dispatch(createPhoto(formData));
    navigate('/');
  };
  return (
    <>
      <input
        type="text"
        value={formData.image_url}
        placeholder="image_url"
        onChange={handleChange('image_url')}
      />
      <input
        type="text"
        value={formData.caption}
        placeholder="caption"
        onChange={handleChange('caption')}
      />
      <button type="button" onClick={handleCreatePhoto}>
        Create Photo
      </button>
    </>
  );
};
export default CreatePhoto;
