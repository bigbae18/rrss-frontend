import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import RegisterSuccess from './components/Register/RegisterSuccess';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/reg-success">
          <RegisterSuccess />
        </Route>
        <Route exact path ="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
