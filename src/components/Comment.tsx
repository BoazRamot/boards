import React, {useEffect, useState} from 'react';
import {ListItem} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IUser from "../models/IUser";
import {Dispatch} from "redux";
import {getPostUserDataAction} from "../store/actions/action.userApiMiddleware";
import {connect} from "react-redux";

interface IProps {
  comment: any;
  // user_id: string;
  // userLogin: boolean;
  getPostUserData: Function;
}

const Comment: React.FC<IProps> = ({ comment, getPostUserData }) => {
  const [userData, setUserData] = useState<IUser>({
    _id: '',
    googleId: '',
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    avatar: '',
  });

  useEffect(() => {
    getPostUserData(comment.userId, setUserData)
  }, []);

  return (
    <ListItem button >
      <ListItemAvatar>
        <Avatar alt={userData.name} src={userData.avatar} />
      </ListItemAvatar>
      <ListItemText primary={comment.body}/>
    </ListItem>
  )
};

const mapStateToProps = (state: any) => ({
  // user_id: state.user.userData._id,
  // userLogin: state.user.userLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPostUserData: (userId: any, setUserData: any) => dispatch(getPostUserDataAction(userId, setUserData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);