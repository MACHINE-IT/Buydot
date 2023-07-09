import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout"
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">


      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Switch>
        <Route exact path="/" >
          <Products />
        </Route>
        <Route exact path="/login" >
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
