import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,notification, Modal,Spin } from 'antd';
import React, { useRef, useState, useEffect,useCallback } from 'react';
import Highlighter from 'react-highlight-words';
import AddProduct from './component/AddProduct'
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from 'axios'
import { apiUrl } from '../../api/index'
import { useDispatch } from 'react-redux'
import * as actionCreators from './store/actionCreators'
import * as loginCreators from '../Login/store/actionCreators'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
axios.defaults.withCredentials = true;

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const Panel = () => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const searchInput = useRef(null);
    const login = useSelector((state) => state.login.login)
    const product = useSelector((state) => state.product.product)
    const role=useSelector((state) => state.login.role)
 


    
  const [isSending, setIsSending] = useState(false)
  const deleteLanguage = useCallback(async (id) => 
  {

    // don't send again while we are sending
    if (isSending) return
    // // update state
    setIsSending(true)
    // // send the actual request
    await axios({
        method: 'DELETE',
        url: apiUrl + "/product/" + id,
        withCredentials:true
    
    })
        .then((res) => {
            if (res.status === 200) {
                notification["success"]({
                    message: <span>Product Deleted successfully!</span>
               
                  });
                setOpen(false);
                setConfirmLoading(false);
                axios({
                    method: 'GET',
                    url: apiUrl + "/product",
                    withCredentials: true
                 
                })
                    .then((res) => (dispatch(actionCreators.setProduct(res.data))))
                    .catch((err) => console.log(err))
            }
        })
    // // once the request is sent, update state again
    setIsSending(false)
  })

    useEffect(() => {
        axios({
            method: 'GET',
            url: apiUrl + "/product",
            withCredentials:true
        })
            .then((res) => (dispatch(actionCreators.setProduct(res.data))))
            .catch((err) => console.log(err))
    }, [])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys)[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <>
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                </>
            ) : (
                text
            ),
    })

    const columns = [
        {
            title: 'Name',
            dataIndex: 'pname',

            ...getColumnSearchProps('pname'),
        },
        {
            title: 'Price',
            dataIndex: 'price',

            ...getColumnSearchProps('price'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'pdesc',
            responsive: ["sm"],
            ...getColumnSearchProps('pdesc'),

        },
        {
            title: 'Action',
            key: 'pid',
            render: (_, record) => (
                <Space size="middle">

                        <a href="#" onClick={()=>showPromiseConfirm(record.pid)}>Delete</a>

                </Space>
            ),
        },
    ]

    const showPromiseConfirm = (id) => {
        confirm({
          title: 'Do you want to delete these items?',
          icon: <ExclamationCircleOutlined />,
          content: 'When clicked the OK button, this dialog will be closed after 1 second',
          onOk() {
            return new Promise((resolve, reject) => {
                resolve(deleteLanguage(id));
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
      };


    const Header = () => {
        return (
            <>
            <div style={{display: 'flex'}}>
                <AddProduct />
                <a href="https://facebook.com" style={{marginLeft:"10px"}}><Button type="primary">View Product Page </Button></a>
           </div>
            </>
        )
    }

    const showPopconfirm = () => {
        setOpen(true);
    };
    //delete
  

    if (login && role[0]==="admin") {
        return (
            <>
        
                <div style={{ height: "100%", width: "100vw" }}>

                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "100px" }}>
                        <div style={{ width: "80%", padding: "40px", overflow: "hidden", marginTop: "200px" }}>


                            <Table columns={columns} dataSource={product} title={Header} pagination={{ onChange: page => { console.log(page); }, pageSize: 4, }} rowKey={p => p.pid} />;

                        </div>
                    </div>
                </div>
            </>
        )
    }else if(role[0]==="user"){
      window.localStorage.clear()
      window.location="/"
      alert("Sorry You are not authorized to access this Page :(")
    } else {
        return <Navigate to="/" />
    }

};

export default Panel;