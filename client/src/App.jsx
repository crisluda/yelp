import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdatePage from "./routes/UpdatePage";
import RestaurantsDetailPage from "./routes/RestaurantsDetailPage";
import Home from "./routes/Home";
import { RestaurantContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/restaurant/:id/update" component={UpdatePage} />
            <Route
              exact
              path="/restaurant/:id"
              component={RestaurantsDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
