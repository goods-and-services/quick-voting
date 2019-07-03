import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';

function Title() {
  
  let title_elems = [{sz:40, txt:'Q.V. - Quick Voting'},
                     {sz:16, txt: 'The Patrician Voting App'}];
    return (
      <div className = 'col-lg-12'>
        {
          title_elems.map((elem: any) => {

            let titleStyle = {
              textAlign: 'center',
              fontSize: elem.sz,
              fontFamily: 'Roboto',
            } as React.CSSProperties;

            return <div style = {titleStyle}>{elem.txt}</div>
          })
        }
      </div>
    )
  
}


function App() {

  let containerStyle = {
    marginTop: window.innerHeight * .2,
  } as React.CSSProperties;

  return (
    
    <div className = 'container-fluid' style = {containerStyle}>
      <div className = 'row'>
        <Title/>
      </div>
    </div>
    
  );
}

export default App;
