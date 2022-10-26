import React, { useState } from 'react';
import { Button, Modal, Spin, Form, Input, message, Upload, Slider,notification } from 'antd';
import { AddpWrapper } from './style'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { apiUrl } from '../../../api/index'
import ImgCrop from 'antd-img-crop';
import {useSelector,useDispatch} from 'react-redux'
import * as actionCreators from '../store/actionCreators'
axios.defaults.withCredentials = true;


const marks = {
    1: 'RM1',
    20: 'RM20',
    50: 'RM50',
    100: {
        style: {
            color: '#FA7070',
        },
        label: <strong>RM100</strong>,
    },
};

const AddProduct = () => {
    
    const dispatch =useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [spinner, setSpinner] = useState(false)
    const product = useSelector((state) => state.product.product)
    const login =useSelector((state) => state.login.login)
   
    


    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
setSpinner(true)
        // console.log(fileList[0].originFileObj)

        let Form = new FormData();


        if(fileList.length === 0 ){
            setSpinner(false)
            notification["warning"]({
                message: 'Do not forget to upload image',
         
              });
          
        }else{
            Form.append("Price", values.price)
            Form.append("Pname", values.name)
            Form.append("Pdesc", values.desc)
            Form.append("files", fileList[0].originFileObj)
        axios({
            method: "POST",
            url: apiUrl + "/product",
            data: Form,
            withCredentials: true,
        
        })
            .then((res) => {
                if(res.status===200){
                    handleCancel()
                    setSpinner(false)
                    notification["success"]({
                        message: <span>{values.name} Added successfully!</span>
                   
                      });

                    axios({
                        method: 'GET',
                        url: apiUrl + "/product",
                        withCredentials: true
                   
                    })
                    .then((res)=>(dispatch(actionCreators.setProduct(res.data))))
                    .catch((err)=>console.log(err))
              
                }             
            })
            .catch((err) => {
             setSpinner(false)
             console(err.response)
            })
        }

 

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const props = {
        width: 500,  //裁剪宽度
        height: 300, //裁剪高度
        resize: false, //裁剪是否可以调整大小
        resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
        modalTitle: "上传图片", //弹窗标题
        modalWidth: 600, //弹窗宽度
    };
    return (
        <AddpWrapper>
            <Button type="primary" onClick={showModal}>
                Add Product
            </Button>
           
                <Modal centered open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Spin spinning={spinner}>
                    <Form
                        layout='vertical'
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">

                        <Form.Item
                            label="Product"
                            name="name"
                            rules={[{ required: true, message: 'Please input product name!' }]}>
                            <Input placeholder='Input Product Name' />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input product price!' }]}>
                            <Slider marks={marks} defaultValue={3} min={1}/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="desc"
                            rules={[{ required: true, message: 'Please input product description!' }]}>
                            <Input.TextArea showCount maxLength={200} rows={3} placeholder="Input product description" />
                        </Form.Item>


                      

                            {/* <ImgCrop rotate quality={1} {...props}> */}
                                <Upload
                                    maxCount={1}
                                    action={`${apiUrl}+${"/product"}`}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 5 && '+ Upload'}
                                </Upload>
                            {/* </ImgCrop> */}
                    




                        <Form.Item style={{ textAlign: "center" }}>
                            <Button type="primary" htmlType="submit" style={{ width: "40%" }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    </Spin>
                </Modal>
           
        </AddpWrapper>
    )
}

export default AddProduct;