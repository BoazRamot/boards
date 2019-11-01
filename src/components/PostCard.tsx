import React, { useState } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import IPost from '../models/IPost';
import { apiURL } from '../services/data.service';
import MenuMoreVertical from './MenuMoreVertical';

interface IProps {
  post: IPost;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<IProps & RouteComponentProps> = ({
  post,
  onDelete,
  match,
}) => {
  const [isEditSelected, setIsEditSelected] = useState(false);

  const onMenuClick = (key: string) => {
    switch (key.toLowerCase()) {
      case 'edit':
        setIsEditSelected(true);
        break;
      case 'delete':
        onDelete(post._id);
        break;
      default:
        break;
    }
  };

  if (isEditSelected) {
    return (
      <Redirect
        push={true}
        to={{
          pathname: `${apiURL}${match.url}/${post._id}`,
          state: { post },
        }}
      />
    );
  }

  return (
    <section className="post-card">
      <section className="post-card-header">
        <div className="post-card-date">
          {new Date(post.createdAt).toLocaleString('default', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </div>
        <MenuMoreVertical onItemClick={onMenuClick} />
      </section>
      <header>{post.title}</header>
      {post.content && <p>{post.content}</p>}
      {post.images &&
        post.images.map(image => (
          <img
            key={image._id}
            src={`${apiURL}${match.url}/posts/${post._id}/images/${image._id}/image`}
            alt={image.description}
          />
        ))}
    </section>
  );
};

export default withRouter(PostCard);
