import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Redirect);
