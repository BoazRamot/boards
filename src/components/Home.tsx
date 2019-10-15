import React, {useEffect} from "react";
import {Route, RouteComponentProps, useHistory} from "react-router";
import Map from "./GoogleMaps/GoogleMap";

interface IProps {

}

const Home: React.FC<IProps & RouteComponentProps> = ({match}) => {
  let history = useHistory();

  useEffect(() => {

    console.log('Home up')
    // const id = (match.params as {id: string}).id;
    const id = (match.params as any).id;
    console.log('id',id)
    // console.log('match.params', JSON.stringify(match.params))
    // const item = localStorage.getItem(id);
    // console.log('item',item)
    history.push("/");
  //   return () => {
  //     console.log('Home down')
  //   }
  // }, []);
  });

  // const a = () => {
  //   const id = (match.params as {id: string}).id;
  //   console.log('id',id)
  //   history.push("/");
  // };


  // const id = (match.params as {id: string}).id;
  // console.log('id',id)
  return (
    <div>
      {/*{() => 'Page not found'}*/}
      {/*{a()}*/}
      {/*{history.push("/")}*/}
      <Route path="/" component={Map}/>
    </div>
  );
};

export default Home;
