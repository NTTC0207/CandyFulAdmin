import  * as actionTypes from './actionTypes'



const defaultState = {
  login:false,
  role:"",

}

export default (state = defaultState, action) => {
   const newState = JSON.parse(JSON.stringify(state))
//    if (action.type === actionTypes.CHANGE_LOGIN) {
//       newState.login = action.value
//       return newState
//    }

if(action.type===actionTypes.LOGIN){
    newState.login = action.data
    return newState
}
if(action.type===actionTypes.LOGOUT){
    newState.login = action.data
    return newState
}
if(action.type===actionTypes.MYROLE){
  newState.role = action.data
  return newState
}



   return state;

}