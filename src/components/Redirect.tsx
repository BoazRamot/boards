import React, { useEffect } from 'react';
import { Route, RouteComponentProps, useHistory } from 'react-router-dom';
import Map from './GoogleMap';

const Redirect: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();

  useEffect(() => {
    console.log('Redirect up');
    const appLocation = localStorage.getItem('boards-app-location');
    const token = (match.params as any).id;
    const account = (match.params as any).account;
    if (token) {
      localStorage.setItem('boards-token', token);
      localStorage.setItem('boards-account', account);
    }
    history.push(`${appLocation}`);
    localStorage.removeItem('boards-app-location');
  });

  return (
    <div>
      <Route path="/" component={Map} />
    </div>
  );
};

export default Redirect;
