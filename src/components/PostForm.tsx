import React, { useEffect, useState } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';
import { postsDataService } from '../App';
import IPost from '../models/IPost';
import { imagesURL } from '../services/data.service';

interface IProps {
  onSubmit: (post: IPost) => void;
}
const PostForm: React.FC<IProps & RouteComponentProps<{ id: string }>> = ({
  onSubmit,
  match,
}) => {
  const [post, setPost] = useState<IPost>();
  const [text, setText] = useState('');
  const [file, setFile] = useState();
  const [fileDataURI, setFileDataURI] = useState();
  const [isUpdateDone, setIsUpdateDone] = useState(false);
  // get data on mount
  useEffect(() => {
    const getPost = async (id: string) => {
      postsDataService.getById(id).then(data => {
        if (data) {
          setPost(data);
          setText(data.text);
        }
      });
    };
    if (match.params.id) {
      getPost(match.params.id);
    }
  }, [match.params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    if (post) {
      await postsDataService.update(post._id, formData);
      setIsUpdateDone(true);
    } else {
      formData.append('createdAt', new Date().toISOString());
      const newPost = await postsDataService.insert(formData);
      formElement.reset();
      setPost(undefined);
      setText('');
      setFileDataURI(undefined);
      onSubmit(newPost);
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target as HTMLTextAreaElement;
    setText(element.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const selectedFile = element.files && element.files[0];
    if (selectedFile) {
      // convert to data URI. see: https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setFileDataURI(e && e.target && e.target.result);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  if (isUpdateDone) {
    return <Redirect push={true} to={`/`} />;
  }

  return (
    <form className="post-form" autoComplete="off" onSubmit={handleSubmit}>
      {post ? <header>Edit Post</header> : <header>Create Post</header>}
      <TextareaAutosize
        name="text"
        minRows={5}
        maxRows={10}
        autoFocus={true}
        spellCheck={true}
        useCacheForDOMMeasurements={true}
        placeholder="Enter your text here..."
        value={text}
        onChange={onTextChange}
      />
      {fileDataURI && <img src={fileDataURI} alt={text} />}
      {!fileDataURI && post && post.image && (
        <img src={`${imagesURL}/${post.image}`} alt={text} />
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onFileChange}
      />
      <button
        type="submit"
        disabled={!text || (post && post.text === text && !file)}
      >
        Submit
      </button>
    </form>
  );
};

export default withRouter(PostForm);
