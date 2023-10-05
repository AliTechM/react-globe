import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from'./components/earth/errorRoute'
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from './components/details';
import MainNav from './components/mainnav';
import {IdContextProvider}  from './components/IdContext';



const router = createBrowserRouter([
  {path: "/react-globe",
    element: <App/>,
    errorElement: <ErrorPage /> },
    {path:"/main",element:<MainNav/>,
    children:[
      {
        path:"details/:navid?",element:<Details/>  
      }
        ]
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <IdContextProvider>
    <RouterProvider router={router} />
    </IdContextProvider>
  </React.StrictMode>
);


reportWebVitals();
