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