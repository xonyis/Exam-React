import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {UserProvider} from "./context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
);