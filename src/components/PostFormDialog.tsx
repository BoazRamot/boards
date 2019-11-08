import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Dialog, DialogActions,
  DialogTitle,
  makeStyles,
  Theme,
} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    media: {
      height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2)
    },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },

  }),
);

interface IProps {
  openNewPost: boolean;
  handleNewPostClose: any;
  createBoardPost: Function;
  handlePostEdit: Function;
  editBoardPost: Function;
  boardId: any;
  post: any;
  userId: any;
}

const PostFormDialog: React.FC<IProps> = ({
                                            openNewPost,
                                            handleNewPostClose,
                                            createBoardPost,
                                            boardId,
                                            post,
                                            handlePostEdit,
                                            editBoardPost,
                                            userId
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [files, setFiles] = useState([] as File[]);
  const [filesDataURIs, setFilesDataURIs] = useState([] as any[]);
  const classes = useStyles();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.body);
      // setFilesDataURIs([]);
    }
  }, [post]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    // userId
    formData.append('userId', userId);
    if (post) {
      formData.append('_id', post._id);
      editBoardPost(formData, boardId);
      handleNewPostClose();
      handlePostEdit();
    } else {
      createBoardPost(formData, boardId);
      formElement.reset();
      setTitle('');
      setContent('');
      setFilesDataURIs([]);
      handleNewPostClose();
    }
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setTitle(element.value);
  };

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target as HTMLTextAreaElement;
    setContent(element.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      // convert to data URI for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (e && e.target && e.target.result) {
          setFilesDataURIs([...filesDataURIs, e.target.result]);
        }
        setFiles([...(files || []), ...(element.files as FileList)]);
      };
      Object.values(element.files).forEach(file => {
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <Dialog open={openNewPost} onClose={handleNewPostClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
      <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            required
            id="outlined-name"
            label="What's on your mind?"
            className={classes.textField}
            name="title"
            value={title}
            onChange={onTitleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            required
            id="outlined-name"
            label="Can you elaborate?"
            className={classes.textField}
            name="body"
            value={content}
            onChange={onContentChange}
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            rows={"5"}
            rowsMax={"10"}
            // autoFocus={true}
            spellCheck={true}
            // useCacheForDOMMeasurements={true}
          />
          {filesDataURIs.length > 0 &&
          filesDataURIs.map((dataURI, index) => (
            <CardMedia
              key={index}
              className={classes.media}
              image={dataURI}
              title={`${index}`}
            />
          ))}
          {filesDataURIs.length === 0 &&
          post &&
          post.images &&
          post.images.map((image: any) => (
            <CardMedia
              key={image._id}
              className={classes.media}
              image={`http://localhost:5000/api/boards/${boardId}/posts/${post._id}/images/${image._id}/image`}
              title={`${image.description}`}
            />
          ))}
        </DialogContent>
        <DialogActions>
          {/*<input*/}
          {/*  type="file"*/}
          {/*  name="images"*/}
          {/*  accept="image/*"*/}
          {/*  onChange={onFileChange}*/}
          {/*/>*/}
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={onFileChange}
            // className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              Upload
            </Button>
          </label>
          <Button variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!title || (post && post.title === title && !files)}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostFormDialog;
