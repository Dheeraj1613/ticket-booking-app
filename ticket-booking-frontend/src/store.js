import { configureStore, applyMiddleware, compose  } from 'redux';
import rootReducer from './reducers'; // Your root reducer

// Enable Redux DevTools Extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(rootReducer, composeEnhancers());

// Export the store
export default store;
