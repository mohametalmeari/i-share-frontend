import render from 'render';
import ReplyCard from '../components/ReplyCard';

describe(ReplyCard, () => {
  const reply = {
    id: 123,
    user: { name: 'Alex', control: false },
    content: 'Test reply',
    likes: 7,
    liked: true,

  };
  const photoId = 456;
  const id = 789;
  const refreshLikes = () => {};
  const removeFromReplies = () => {};

  test('renders Snapshot', () => {
    const { container } = render(
      <ReplyCard
        id={reply.id}
        photoId={photoId}
        commentId={id}
        name={reply.user.name}
        content={reply.content}
        likes={reply.likes}
        liked={reply.liked}
        control={reply.user.control}
        refreshLikes={refreshLikes}
        removeFromReplies={removeFromReplies}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
