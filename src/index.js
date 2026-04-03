import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import {BrowserRouter} from "react-router-dom";

import { store } from './app/store';

import dayjs from "dayjs";
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';


dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);
dayjs.locale('ko');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <CookiesProvider>
          <Provider store={store}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
          </Provider>
      </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
