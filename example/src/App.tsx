import React from 'react';
import SayHello from 'react-api-king';
import './App.css';

import { Container } from '@mui/material';
import { SimpleTable } from './Simple';
import { SimpleSuspenseTable } from './Suspense';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <SimpleTable />
        <SimpleSuspenseTable />
      </Container>
    </div>
  );
}

export default App;