import React from "react";

// React Router Dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import { Home, Dashboard, Edit } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Edit} path="/:token/:tokenID" />
        <Route component={Dashboard} path="/:address" />
        <Route component={Home} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
