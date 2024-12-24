import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, Box } from '@chakra-ui/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Box bg="rgb(139, 92, 246)" minH="100vh" color="white">
        <App />
        <ToastContainer />
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
