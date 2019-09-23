import React from "react";
import HomePage from "./HomePage";
import Login from "./Login";
import { Route, Switch } from "react-router-dom";
import UnosStudijaPage from "./UnosStudijaPage";
import UnosIspitanikPage from "./UnosIspitanikPage";
import UnosMerenjePage from "./UnosMerenjePage";
import { ProtectedRoute } from "./ProtectedRoute";
import PretragaStudijaPage from "./PretragaStudijaPage";
import PretragaIspitanikPage from "./PretragaIspitanikPage";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      {/* <Route path="/homePage" component={HomePage} /> */}
      <ProtectedRoute exact path="/homePage" component={HomePage} />
      <Route path="/unosStudijaPage" component={UnosStudijaPage} />
      <Route path="/unosIspitanikPage" component={UnosIspitanikPage} />
      <Route path="/unosMerenjePage" component={UnosMerenjePage} />
      <Route path="/pretragaStudijaPage" component={PretragaStudijaPage} />
      <Route path="/pretragaIspitanikPage" component={PretragaIspitanikPage} />
      <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  );
}

export default App;
