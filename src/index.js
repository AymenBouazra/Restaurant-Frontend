import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartReducer, { getTotals } from './clientSide/features/CartSlice';
import FoodReducer, { foodFetch } from './clientSide/features/foodSlice';
import NotificationReducer, { notificationFetch } from './clientSide/features/NotificationSlice';
import { foodApi } from './clientSide/features/foodApi';
import { notificationApi } from './clientSide/features/NotificationApi';

const store = configureStore({
  reducer: {
    food: FoodReducer,
    cart: CartReducer,
    notification: NotificationReducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([foodApi.middleware, notificationApi.middleware]),
})


store.dispatch(notificationFetch());
store.dispatch(foodFetch());
store.dispatch(getTotals());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
