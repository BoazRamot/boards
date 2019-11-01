import React from 'react';
import ILookup from '../models/ILookup';
import IPost from '../models/IPost';
// import Loading from './Loading';
import PostCard from './PostCard';

interface IProps {
  postList: ILookup<IPost>;
  onPostDelete: (id: string) => void;
}

const PostList: React.FC<IProps> = ({ postList, onPostDelete }) => {
  // if (!postList) {
  //   return <Loading />;
  // }

  return (
    <section className="post-list">
      {Object.values(postList)
        .reverse()
        .map(post => (
          <PostCard key={post._id} post={post} onDelete={onPostDelete} />
        ))}
    </section>
  );
};

export default PostList;
