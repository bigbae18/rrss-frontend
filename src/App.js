import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import { AuthProvider } from './hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
      <Navbar/>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/me">
          <Profile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
