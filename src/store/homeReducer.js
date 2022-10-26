

import thunk from 'redux-thunk'
import { createStore,combineReducers,applyMiddleware,compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"; 
import {reducer as loginReducer} from '../Admin/Login/store'
import {reducer as productReducer} from '../Admin/Panel/store'
// import {reducer as profileReducer} from '../pages/profile/store'
const reducer= {
   login :loginReducer,
   product:productReducer
}



const persistConfig = {
    key: "root",
    storage,
    whitelist: ["login","product"], //需要缓存的数据
    blacklist:[], //不需要缓存的数据
}
// 合并
const rootReducer  = combineReducers(reducer)
const persistedReducer = persistReducer(persistConfig, rootReducer)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({   
    }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
      
      );

      const store = createStore(persistedReducer, enhancer);



export const persistor = persistStore(store)

export default store


















// import {reducer as headerReducer} from '../common/header/store'
// // import{combineReducers} from 'redux'
// import {reducer as homeReducer} from '../pages/home/store/'
// import {reducer as detailReducer} from '../pages/detail/store'
// import {reducer as loginReducer} from '../pages/login/store'
// import {reducer as navigationReducer} from '../common/navigation/store'
// import {reducer as profileReducer} from '../pages/profile/store'
// import thunk from 'redux-thunk'

// import { createStore,combineReducers,applyMiddleware,compose } from 'redux'

// import { persistStore, persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage"; 

// const reducer= {
//     navigation:navigationReducer,
//     header:headerReducer,
//     home:homeReducer,
//     detail:detailReducer,
//     login:loginReducer,
//     profile:profileReducer,
// }


// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["login","profile"], //需要缓存的数据
//     blacklist:[], //不需要缓存的数据
// }
// // 合并
// const rootReducer  = combineReducers(reducer)
// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({   
//     }) : compose;

//     const enhancer = composeEnhancers(
//         applyMiddleware(thunk),
      
//       );

//       const store = createStore(persistedReducer, enhancer);



// export const persistor = persistStore(store)
// export default store