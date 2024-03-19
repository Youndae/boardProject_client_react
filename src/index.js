import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer);
const persistor = persistStore(store);


root.render(
  <React.StrictMode>
      <CookiesProvider>
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                  <App />
              </PersistGate>
          </Provider>
      </CookiesProvider>
  </React.StrictMode>
);

export default store;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
