import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import IUser from '../models/IUser';
import DataService, { DataCollections } from '../services/data.service';
import Loading from './Loading';

const userDataService = new DataService<IUser>();

const User: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [user, setUser] = useState<IUser>();
  // get data on mount
  useEffect(() => {
    const getUser = async (id: string) => {
      userDataService.getById(DataCollections.Users, id).then(data => {
        if (data) {
          setUser(data);
        }
      });
    };
    if (match.params.id) {
      getUser(match.params.id);
    }
  }, [match.params.id]);

  if (!user) {
    return <Loading />;
  }

  return (
    <Grid container={true} justify="center">
      <div>place holder</div>
    </Grid>
  );
};

export default User;
