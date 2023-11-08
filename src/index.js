import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { MyTheme } from './config/MyTheme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { RefreshProvider } from './context/refreshContext/Refresh';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/userContext/UserContext';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RefreshProvider>
      <AuthProvider>
        <UserProvider>
          <CookiesProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ThemeProvider theme={MyTheme}>
                <ToastContainer />
                <App />
              </ThemeProvider>
            </LocalizationProvider>
          </CookiesProvider>
        </UserProvider>
      </AuthProvider>
    </RefreshProvider>
);
