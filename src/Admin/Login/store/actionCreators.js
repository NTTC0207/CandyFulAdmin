
import * as actionTypes from './actionTypes'

export const setLogin=()=>({
    type:actionTypes.LOGIN,
    data:true
   
})

export const setLogout=()=>({
    type:actionTypes.LOGOUT,
    data:false
})

export const setRole=(data)=>({
    type:actionTypes.MYROLE,
    data
})
