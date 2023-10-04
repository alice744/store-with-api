import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import './styles/index.css'

import App from './components/App/App.jsx'
import { store } from "./feauters/store";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter >
            <App > </App>
        </BrowserRouter >
    </Provider>
);