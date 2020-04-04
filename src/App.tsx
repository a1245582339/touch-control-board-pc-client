import React from 'react';
import Header from '@/components/header'
import Home from '@/layout/index'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header> </Header>
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
