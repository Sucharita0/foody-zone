import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <Auth0Provider
    domain="dev-a821m38g4emxqlxm.us.auth0.com"
    clientId="DgNCeOqLwl3cosDycVt7ltMpYTtLYHc8"
    
      redirect_uri= {window.location.origin}>
        <App/>
        </Auth0Provider>
  
);
