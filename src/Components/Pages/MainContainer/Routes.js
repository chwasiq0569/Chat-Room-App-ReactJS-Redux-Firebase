import React from "react";
import { Route } from "react-router-dom";
import Favourites from "./Favourites/Favourites";
import Tagged from "./Tagged/Tagged";
// import Notifications from "./Notifications/Notifications";
import Timeline from "./Timeline/Timeline";

const Routes = (props) => {
  return (
    <div className="timeline__Comp">
      <Route path="/home/timeline" component={Timeline} />
      <Route path="/home/favourites" component={Favourites} />
      <Route path="/home/tagged" component={Tagged} />
    </div>
  );
};

export default Routes;
