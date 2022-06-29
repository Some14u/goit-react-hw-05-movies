import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'components/App';
import './index.css';
import { UrlProvider } from "helpers/urlApi";

const applicationStructure = [
  "/",
  "/movies",
  "/movies/:movieId",
  "/movies/:movieId/cast",
  "/movies/:movieId/reviews",
];

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <UrlProvider structure={applicationStructure}>
      <App />
    </UrlProvider>
  // </React.StrictMode>
);
