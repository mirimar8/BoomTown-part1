import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Items from '../pages/Items';
import Home from '../pages/Home';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import { ViewerContext } from '../context/ViewerProvider';


export default () => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
      if (loading) return null;
      if (viewer) {
        return (
          <Fragment>
            <menu />
            <Switch>
              <Route path="/share" component={Share} />
              <Route path="/items" component={Items} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/profile/:userid" component={Profile} />
              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        )

      } else {
        return (
          <Switch>
            <Route path="/welcome" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        )
      }
    }}

  </ViewerContext.Consumer>

);
