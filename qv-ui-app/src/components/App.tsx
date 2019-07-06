import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import VoteTemplate from './BallotCreator';
import BallotSettingsApp from './BallotSettingsApp';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function Title() {
  
  let title_elems = [{tag:'global-text-style-lg', txt:'Q.V. - Quick Voting'},
                     {tag:'global-text-style-sm', txt: 'The Patrician Voting App'}];
    return (
      <div className = 'row'>
        <div className = 'col-lg-12'>
          {
            title_elems.map((elem: any, idx: number) => {
              return <div className = {`${elem.tag}`} key = {idx}>{elem.txt}</div>
            })
          }
        </div>
      </div>
    )
  
}


function MainMenu() {
  let containerStyle = {
    marginTop: window.innerHeight * .15,
  } as React.CSSProperties;

  return (
    <div className = 'container-fluid' style = {containerStyle}>
        <Title/>
        <BallotSettingsApp/>
    </div>
  );
}


function NoMatch({ location }: any) {
  return (
    <div>
      <h3>
        404: No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={MainMenu} />
          <Route path='/qv'  component={VoteTemplate}/ >
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
