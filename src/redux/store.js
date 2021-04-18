import {applyMiddleware, createStore} from 'redux'
import scheduleReducer from './schedule/scheduleReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(scheduleReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;