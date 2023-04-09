import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";

// Routing: Renderiza el sistema de rutas
export default function Routing(props) {
  const { setRefreshCheckLogin } = props;

  return (
    // Router envuelve toda la aplicacion
    <Router>
        {/* -- Switch cuando encuentre la pagina que se busca deja de buscar */}
      <Switch>
        {map(configRouting, (route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}