import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/antd.min.css';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import {Root, AppsRoot, AuthRoot} from './containers';
import {AppsHome, AuthLoad, ErrorPage} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: 'auth',
        element: <AuthRoot />,
        children: [
          {
            path: 'load',
            element: <AuthLoad />
          },
          {
            path: '',
            element: <Navigate to='load'/>
          }
        ]
      },
      {
        path: 'apps',
        element: <AppsRoot />,
        children: [
          {
            path: '',
            element: <AppsHome />
          }
        ]
      },
      {
        path: '',
        element: <Navigate to='auth'/>
      }
    ]
  }
])



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID!}
      redirectUri={`${window.location.origin}/apps`}
      audience={process.env.REACT_APP_API_AUDIENCE}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
      {/* <App />*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
