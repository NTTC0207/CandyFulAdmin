import React ,{useState}from "react";
import { Button, Checkbox, Form, Input, Spin,Alert } from 'antd';
import { LoginWrapper, SigninWrapper } from './style'
import {Link,useNavigate,Navigate} from "react-router-dom"
import axios from 'axios'
import {apiUrl} from '../../api/index'
import * as actionCreators from './store/actionCreators'
import {useDispatch,useSelector}from 'react-redux'


axios.defaults.withCredentials = true;

const AdminL =()=>{
const dispatch = useDispatch()
    const navigate =useNavigate()
    const login = useSelector((state)=>state.login.login)
    const [message,setMessage] =useState("Something Went Wrong :(");
    const [show,setShow] =useState(false);
    const [loading, setLoad] = useState(false)

    const onFinish=(values)=>{
        setLoad(true)
        let Form = new FormData()

        Form.append("Email",values.username)
        Form.append("Password",values.password)

        axios({
            method: "POST",
            url:apiUrl+"/login",
            data:Form,
            withCredentials:true
        }).then((res)=>{ 
            setLoad(false)
            if(res.status=== 200){
                navigate("/admin-panel")
                dispatch(actionCreators.setRole(res.data))
                dispatch(actionCreators.setLogin())
            }

        }).catch((err)=>{
             setLoad(false) 
             setShow(true)
            setMessage(err.response.data)
            })

    }
  if(!login){
    return(
        <>
         <LoginWrapper style={{ width: "100vw", height: "100%" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "100px" }}>
                <div style={{ width: "380px", background: "white", padding: "40px", marginTop: "200px", boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" }}>

                <Alert
      message={message}
    //   description={error}
      type="error"
      banner={false}
      style={show === true ?{display: "block"}:{display: "none"}}
    />
                    <SigninWrapper>
                        <Spin spinning={loading}>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}>

                                <h2 style={{ display: "flex", justifyContent: "center", fontFamily: 'Niconne', fontSize: "2rem" }}>Admin Login</h2>

                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                >
                                    <Input placeholder="Username"            
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input.Password

                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                                        Login
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Spin>
                    </SigninWrapper>


                </div>
            </div>
        </LoginWrapper>
        </>
    )
  }else{
return <Navigate to="/admin-panel"/>
  }
}

export default AdminL;