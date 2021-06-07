import React from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './ui/Home/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
