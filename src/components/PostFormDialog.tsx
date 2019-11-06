import React, { ReactEventHandler, useState } from 'react';
import { Redirect } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  createStyles,
  Dialog,
  DialogTitle,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
  handleNewPostClose: ReactEventHandler;
  createBoardPost: Function;
  boardId: any;
}

const PostFormDialog: React.FC<IProps> = ({ openNewPost, handleNewPostClose, createBoardPost, boardId, }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [files, setFiles] = useState([] as File[]);
  const [filesDataURIs, setFilesDataURIs] = useState([] as any[]);
  const [isUpdateDone, setIsUpdateDone] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    // if (post) {
    //   await postDataService.update(post._id, formData);
    //   setIsUpdateDone(true);
    // } else {
      createBoardPost(formData, boardId)
      // const newPost = await postDataService.insert(formData);
      formElement.reset();
      setTitle('');
      setContent('');
      setFilesDataURIs([]);
      // onSubmit(newPost);
    // }
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

  if (isUpdateDone) {
    return <Redirect push={true} to={`/`} />;
  }

  return (

    <Dialog open={openNewPost} onClose={handleNewPostClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
      <form className="post-form" autoComplete="off" onSubmit={handleSubmit}>
        {/* {post ? <header>Edit Post</header> : <header>Create Post</header>} */}
        <input name="title" value={title} placeholder="What's on your mind?" onChange={onTitleChange} />
        <TextareaAutosize
          name="content"
          minRows={5}
          maxRows={10}
          autoFocus={true}
          spellCheck={true}
          useCacheForDOMMeasurements={true}
          placeholder="Can you elaborate?"
          value={content}
          onChange={onContentChange}
        />
        {filesDataURIs.length > 0 &&
        filesDataURIs.map((dataURI, index) => (
          <img key={index} src={dataURI} alt={`${index}`} />
        ))}
        {/*{filesDataURIs.length === 0 &&*/}
        {/*post &&*/}
        {/*post.images &&*/}
        {/*post.images.map(image => (*/}
        {/*  <img*/}
        {/*    key={image._id}*/}
        {/*    // src={`${apiURL}${match.url}/posts/${post._id}/images/${image._id}/image`}*/}
        {/*    src={`${apiURL}${match.url}/posts/${post._id}/images/${image._id}/image`}*/}
        {/*    alt={`${image.description}`}*/}
        {/*  />*/}
        {/*))}*/}
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={onFileChange}
        />
        <button
          type="submit"
          // disabled={!title || (post && post.title === title && !files)}
        >
          Submit
        </button>
      </form>
      {/*<form autoComplete="off" onSubmit={handleSubmit} ref={formEl} className={classes.container}>*/}
      {/*  <DialogContent>*/}
      {/*    <TextField*/}
      {/*      required*/}
      {/*      id="outlined-name"*/}
      {/*      label="Board Name"*/}
      {/*      className={classes.textField}*/}
      {/*      value={values.post}*/}
      {/*      onChange={handleChange('post')}*/}
      {/*      margin="normal"*/}
      {/*      variant="outlined"*/}
      {/*      fullWidth*/}
      {/*    />*/}
      {/*    <TextField*/}
      {/*      id="outlined-select-currency"*/}
      {/*      select*/}
      {/*      label="Category"*/}
      {/*      className={classes.textField}*/}
      {/*      value={values.category}*/}
      {/*      onChange={handleChange('category')}*/}
      {/*      SelectProps={{*/}
      {/*        MenuProps: {*/}
      {/*          className: classes.menu,*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      helperText="Please Select Your Post Category"*/}
      {/*      margin="normal"*/}
      {/*      variant="outlined"*/}
      {/*    >*/}
      {/*      {category.map((option, index) => (*/}
      {/*        <MenuItem key={index} value={option.value}>*/}
      {/*          {option.value}*/}
      {/*        </MenuItem>*/}
      {/*      ))}*/}
      {/*    </TextField>*/}
      {/*    /!*<TextField*!/*/}
      {/*    /!*  id="outlined-dense-multiline"*!/*/}
      {/*    /!*  label="Board Description"*!/*/}
      {/*    /!*  className={clsx(classes.textField, classes.dense)}*!/*/}
      {/*    /!*  margin="dense"*!/*/}
      {/*    /!*  variant="outlined"*!/*/}
      {/*    /!*  multiline*!/*/}
      {/*    /!*  fullWidth*!/*/}
      {/*    /!*  rowsMax="4"*!/*/}
      {/*    /!*  value={values.description}*!/*/}
      {/*    /!*  onChange={handleChange('description')}*!/*/}
          {/*/>*/}
      {/*    /!* todo: add static map*!/*/}
      {/*  </DialogContent>*/}
      {/*  <DialogActions>*/}
      {/*    <Button onClick={handleNewPostClose} color="primary">*/}
      {/*      Cancel*/}
      {/*    </Button>*/}
      {/*    <Button variant="contained" color="primary" type="submit">*/}
      {/*      Submit*/}
      {/*    </Button>*/}
      {/*  </DialogActions>*/}
      {/*</form>*/}
    </Dialog>
  );
};

export default PostFormDialog;
