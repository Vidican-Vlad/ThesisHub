import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript, DarkMode } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const theme = extendTheme({ config })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <DarkMode>
        <App/>
      </DarkMode>
    </ChakraProvider>
  </React.StrictMode>
);
reportWebVitals();
