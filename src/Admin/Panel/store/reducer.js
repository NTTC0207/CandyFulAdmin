import * as actionTypes from './actionTypes'

const defaultState = {
  product: [],
  detail: []
}

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  
  if (action.type === actionTypes.GETPRODUCT) {
    newState.product = action.data
    return newState;
  }

  if (action.type === actionTypes.GETDETAIL) {
    newState.detail = action.data
    return newState;
  }


  return state;

}