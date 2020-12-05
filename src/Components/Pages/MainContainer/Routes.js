import React from "react";
import { Route } from "react-router-dom";
import Favourites from "./Favourites/Favourites";
import Tagged from "./Tagged/Tagged";
import Notifications from "./Notifications/Notifications";
import Timeline from "./Timeline/Timeline";

const Routes = () => {
  return (
    <div className="timeline__Comp">
      <Route path="/maincomponent/timeline" component={Timeline} />
      <Route path="/maincomponent/favourites" component={Favourites} />
      <Route path="/maincomponent/tagged" component={Tagged} />
      <Route path="/maincomponent/notifications" component={Notifications} />
    </div>
  );
};

export default Routes;
