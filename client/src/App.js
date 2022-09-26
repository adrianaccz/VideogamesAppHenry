import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import VideogameDetail from './components/VideogaDetail/VideogameDetail';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Footer/>
      <Switch>
        <Route exact path='/' >
          <LandingPage/>
        </Route>
        <Route exact path='/videogames/create'>
          <CreateVideogame/>
        </Route>
        <Route exact path='/videogames'>
          <Home/>
        </Route>
        <Route exact path='/videogames/:id'>
          <VideogameDetail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
