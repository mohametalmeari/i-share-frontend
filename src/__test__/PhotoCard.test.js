import render from 'render';
import PhotoCard from '../components/PhotoCard';

describe(PhotoCard, () => {
  const photo = {
    id: 123,
    user: { name: 'Alex', control: false, profile_image: 'fake/url' },
    image_url: 'fake/url',
    caption: 'Test photo',
    likes: 7,
    comments: 3,
    liked: true,

  };

  test('renders Snapshot', () => {
    const { container } = render(
      <PhotoCard
        id={photo.id}
        name={photo.user.name}
        imageUrl={photo.image_url}
        profileImage={photo.user.profile_image}
        caption={photo.caption}
        likes={photo.likes}
        comments={photo.comments}
        liked={photo.liked}
        control={photo.user.control}
        navigator={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
