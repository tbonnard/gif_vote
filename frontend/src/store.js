import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import gifDuoReducer from './reducers/gifDuoReducer'
import gifCompareReducer from './reducers/gifCompareReducer'
import notifReducer from './reducers/notifReducer'
import fameReducer from './reducers/fameReducer'
import categoryReducer from './reducers/categoryReducer'
import leaderboardReducer from './reducers/leaderboardReducer'

const reducer = combineReducers({
    user: userReducer,
    gifDuo:gifDuoReducer,
    gifCompare:gifCompareReducer,
    notif: notifReducer,
    fame:fameReducer,
    category:categoryReducer,
    leaderboard:leaderboardReducer
  })
  
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
  
  export default store