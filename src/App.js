import React from 'react';
import {
  Home,
  Listing,
  Listings,
  Login,
  PastTrips,
  Profile,
  Trips
} from './pages';

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/listings">
          <Listings />
        </Route>
        <Route path="/listing:id">
          <Listing />
        </Route>
        <Route path="/trips">
          <Trips />
        </Route>
        <Route path="/past-trips">
          <PastTrips />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
