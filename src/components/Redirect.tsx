import React, { useEffect } from 'react';
import { Route, RouteComponentProps, useHistory } from 'react-router-dom';
import Map from './GoogleMap';

const Redirect: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();

  useEffect(() => {
    console.log('Redirect up');
    const token = (match.params as any).id;
    console.log('token Redirect', token);
    if (token) {
      localStorage.setItem('boards-token', token);
    }
    history.push('/');
  });

  return (
    <div>
      <Route path="/" component={Map} />
    </div>
  );
};

export default Redirect;
