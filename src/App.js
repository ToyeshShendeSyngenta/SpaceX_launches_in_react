// App.js
import React from 'react';
import FrontPage from './components/FrontPage';
import { ApiProvider } from './components/ApiProvider';

function App() {
  return (
    
    <ApiProvider>
    <FrontPage />
 
  </ApiProvider>
   
  );
}

export default App;

