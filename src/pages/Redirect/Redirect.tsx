import React, {useEffect} from "react";
import {Route, RouteComponentProps, useHistory} from "react-router";
import Map from "../GoogleMap/GoogleMap";
import {Dispatch} from "redux";
import {connect} from "react-redux";

interface IProps {
}

const Redirect: React.FC<IProps & RouteComponentProps> = ({ match}) => {
  let history = useHistory();

  useEffect(() => {
    console.log('Redirect up')
    const token = (match.params as any).id;
    console.log('token Redirect', token)
    if (token) {
      localStorage.setItem('boards-token', token);
    }
    // try {
      // const serializedState: any = localStorage.getItem('boards-map-state');
      // const state = JSON.parse(serializedState);
      // console.log('state', state)
      // resetRedirect(state.address, state.latLng, state.marker, state.mapBoards, state.open);
      // updateRedirect(state.address, state.latLng);
      // updateRedirect();
    // } catch (err) {
    //   console.log('getItem err', err);
    // }

    history.push("/");
  });
  
  return (
    <div>
      <Route path="/" component={Map}/>
    </div>
  );
};

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Redirect);