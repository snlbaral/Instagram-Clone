import './assets/css/style.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/global/Navbar';
import Register from './components/Register';
import axios from 'axios'
import { withRouter } from 'react-router';
import PostContext from './components/global/PostContext';

axios.defaults.baseURL = "http://localhost:5000/api"


function App() {
  return (
    <>
    <PostContext>
    {localStorage.getItem('token') && (
      <Navbar/>
    )}
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={Register}/>
      </Switch>
      </PostContext>
    </>
  );
}

export default withRouter(App);
