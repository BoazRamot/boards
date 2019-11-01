import React, { useEffect, useState } from 'react';
import IBoard from '../models/IBoard';
import ILookup from '../models/ILookup';
import IPost from '../models/IPost';
import BoundDataService from '../services/BoundDataService';
import { DataCollections } from '../services/data.service';
import Loading from './Loading';
import PostForm from './PostForm';
import PostList from './PostList';

interface IProps {
  board: IBoard;
}

const BoardFeed: React.FC<IProps> = ({ board }) => {
  const [postList, setPostList] = useState<ILookup<IPost>>({});
  const postDataService = new BoundDataService<IPost>(
    `${DataCollections.Boards}/${board._id}`,
    DataCollections.Posts,
  );
  useEffect(() => {
    const getPostList = async () => {
      const posts = await postDataService.get();
      const postLookup: ILookup<IPost> = {};
      posts.forEach(post => (postLookup[post._id] = post));
      setPostList(postLookup);
    };
    getPostList();
  }, []);

  const onNewPost = (newPost: IPost) => {
    setPostList({ [newPost._id]: newPost, ...postList });
  };

  const onPostDelete = async (id: string) => {
    await postDataService.remove(id);
    delete postList[id];
    setPostList({ ...postList });
  };

  if (!postList) {
    return <Loading />;
  }

  return (
    <section className="board-feed">
      <PostForm postDataService={postDataService} onSubmit={onNewPost} />
      <PostList postList={postList} onPostDelete={onPostDelete} />
    </section>
  );
};

export default BoardFeed;
