import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import './App.css';
import AddTask from './components/AddTask';
import Home from './components/Home';
import Login from './components/Login';
import Registerasinstructor from './components/Registerasinstructor';
import Registerasuser from './components/Registerasuser';
import ScoreTask from './components/ScoreTask';
import Tasks from './components/Tasks';



function App() {
  return (
    <div className="App">
      <header>
        <div style={{ height: "50px", marginBottom: "10px", width: "100%", background: "grey", marginTop: 0, fontWeight: "normal", fontSize: "large", color: "white", verticalAlign: "middle", display: "flex", justifyItems: "center", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
               </div>
      </header>
      <main>
        <BrowserRouter>
          <Switch>
          <Route path="/registerasuser" exact component={Registerasuser} />
          <Route path="/registerasinstructor" exact component={Registerasinstructor} />

            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/addtask" exact component={AddTask} />
            <Route path="/tasks" exact component={Tasks} />
            <Route path="/scoretask/:tname" exact component={ScoreTask} />

          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
