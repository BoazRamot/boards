import React, {useEffect} from "react";
import {Route, RouteComponentProps, useHistory} from "react-router";
import Map from "./GoogleMaps/GoogleMap";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {userLogin, userLogout} from "../store/actions/action.loginReducer";
import {setRedirect, updateRedirect} from "../store/actions/action.mapReducer";

interface IProps {
  userLogin: Function
  userLogout: Function
  updateRedirect: Function
  // setRedirect: Function
}

const Redirect: React.FC<IProps & RouteComponentProps> = ({ /*setRedirect,*/ updateRedirect, userLogin, userLogout, match}) => {
  let history = useHistory();

  useEffect(() => {
    console.log('Redirect up')
    const token = (match.params as any).id;
    console.log('token Redirect', token)
    if (token) {
      localStorage.setItem('boards-token', token);
      userLogin();
    }
    try {
      const serializedState: any = localStorage.getItem('boards-map-state');
      const state = JSON.parse(serializedState);
      console.log('state', state)
      // resetRedirect(state.address, state.latLng, state.marker, state.mapBoards, state.open);
      updateRedirect(state.address, state.latLng, state.mapBoards);
    } catch (err) {
      console.log('getItem err', err);
    }

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
  // setRedirect: () => dispatch(setRedirect()),
  userLogin: () => dispatch(userLogin()),
  userLogout: () => dispatch(userLogout()),
  updateRedirect: (address: string, latLng: any, mapBoards: any) => dispatch(updateRedirect(address, latLng, mapBoards)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redirect);