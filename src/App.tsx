import React from 'react';
import logo from './logo.svg';
import {Nav} from './features/nav/Nav'
import './App.css';
import { Memo } from './features/memo/Memo';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Memo/>
    </div>
  );
}

export default App;
