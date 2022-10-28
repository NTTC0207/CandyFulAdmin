import React,{Suspense,lazy} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "./sass/main.scss"
import {Provider,useSelector} from  'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import store,{persistor} from './store/homeReducer'
import 'antd/dist/antd.css';
import Sidebar from './Admin/Sidebar/index'
import {apiUrl} from './api/index'
import axios from 'axios'
//Admin
const AdminL = lazy(()=>import("./Admin/Login/index"))
const Panel = lazy(()=>import("./Admin/Panel/index"))
const Order = lazy(()=>import("./Admin/Order/index"))


const App  =()=>{
   const login = useSelector((state) => state.login.login)

   axios.interceptors.response.use(
      res => {
  
        return res;
      },
      err => {
        if (err.response.status === 401) {
          console.log("hello")
        
          axios({
            method: "GET",
            url: apiUrl + "/refresh",
            withCredentials: true
          }).then((res) => {

          })
        }
        
  
        return Promise.reject(err);
  
      }
  
    )


  return(
    <>
<Provider store ={store} >
   <PersistGate persistor={persistor}>
<BrowserRouter>
<Suspense fallback={<div>...loading</div>}>
  { login === true ? <Sidebar />:null } 
<Routes>
  

   <Route element={<AdminL/>} path="/"/> 
   <Route element={<Panel/>} path="/admin-panel"/> 
   <Route element={<Order/>} path="/admin-order"/> 



</Routes>

</Suspense>

</BrowserRouter>
</PersistGate>
   </Provider>

    </>
  )
}

export default App;
