import { DownOutlined,ExclamationCircleOutlined ,SearchOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu, Space, Table, Button, Form, Input,Modal } from 'antd';
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { apiUrl } from '../../api/index'
import Highlighter from 'react-highlight-words';
import moment from 'moment'
import * as actionCreators from '../Panel/store/actionCreators'
import {useDispatch,useSelector} from 'react-redux'
axios.defaults.withCredentials = true;

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: 'Action 1',
            },
            {
                key: '2',
                label: 'Action 2',
            },
        ]}
    />
);




const Order = () => {

    const dispatch = useDispatch();
    const detail = useSelector((state) => state.product.detail)
    const [status, setStatus] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  

    const LocalizedModal = () => {
        const [open, setOpen] = useState(false);
        const showModal = () => {
          setOpen(true);
        };
        const hideModal = () => {
          setOpen(false);
        };
    }

    const ChangeDate = (date) => {
        return moment(date).format("MMMM Do YYYY");

    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: apiUrl + '/order',
            withCredentials: true,
        })
            .then((res) => (setStatus(res.data)))

    }, [])

const handleDetail=(id)=>{
console.log(id)
    axios({
        method: 'GET',
        url: apiUrl + '/order/'+id,
        withCredentials: true,
    }).then((res)=>(
       dispatch(actionCreators.setDetail(res.data))
    ))

    Modal.info({
        title: <>{detail.userName} Information </>,
        content: (
          <div>
            <p>Address: {detail.address}</p>
            <p>Phone: {detail.phoneNumber}</p>
          </div>
        ),
        onOk() {},
      });
}


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


    
    const column1 = [
        {
            title: 'Product',
            dataIndex: 'oBname',
            key: 'date',

        },
        {
            title: 'Quantity',
            dataIndex: 'oBquantity',
            key: 'name',
        },
        {
            title: 'Price',
            key: 'state',
            dataIndex: 'oBprice',
        }
    ];



    const columns = [
        {
            title: 'Name',
            dataIndex: 'uname',
            render: (_, status) => (
                <>
                  
                   <div style={{cursor:"pointer"}} onClick={()=>handleDetail(status.id)}>{status.uname}</div>
                 
                </>
            ),
            ...getColumnSearchProps('uname'),
        },
        {
            title: 'Amount',
            dataIndex: 'totalAmout',
            key: 'platform',
            render: (_, status) => (
                <span>

                    RM {status.totalAmout}
                </span>
            )
        },
        {
            title: 'Payment status',
            dataIndex: 'hasPaid',
            key: 'version',
            render: (_, status) => (
                <span>

                    {status.hasPaid === true ? <span><Badge status="success" />Paid</span> : <span><Badge status="error" />Not yet paid</span>}
                </span>
            )
        },
        {
            title: 'Deliver Status',
            dataIndex: 'hasDeliver',
            key: 'creator',
            render: (_, status) => (
                <span>

                    {status.hasDeliver === true ? <span><Badge status="success" />Delivered</span> : <span><Badge status="error" />Not yet delivered</span>}
                </span>
            ),
         

        },
        {
            title: 'Date',
            dataIndex: 'orderDate',
            key: 'createdAt',
            render: (_, status) => (
                <span>
                    {
                        ChangeDate(status.orderDate)
                    }
                </span>
            )
        },
        {
            title: 'Payment Type',
            dataIndex: 'method',
            key: 'upgradeNum',
        },
        {
            title: 'Payment ID',
            dataIndex: 'paymentID',
            key: 'upgradeNum',
        },
        {
            title: 'Action',
            key: 'operation',
            render: (_, status) => <a onClick={()=>confirm(status.orderID,status.uname)}>Update</a>,
        },
    ];

    const confirm = (id,name) => {
        Modal.confirm({
          title: <><span>Update {name} delivery status</span></>,
          icon: <ExclamationCircleOutlined />,
          content: 'Update  cannot be undo',
          okText: 'update',
          cancelText: 'cancel',
          onOk:() => axios({
            method:"Put",
            url:apiUrl +"/order/"+id
          }).then(()=>{   axios({
            method: 'GET',
            url: apiUrl + '/order',
            withCredentials: true,
        })
            .then((res) => (setStatus(res.data)))  })
        });
      };
    return (
        <>

            <div style={{ height: "100%", width: "100vw" }}>

                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "100px" }}>
                    <div style={{ width: "80%", padding: "40px", overflow: "hidden", marginTop: "200px" }}>

                    <LocalizedModal />
                        <Table
                            columns={columns}
                            rowKey={(p) => p.orderID}
                            expandable={{

                                defaultExpandedRowKeys: ['0'],
                                expandedRowRender: record =>
                                
                                <div >
                                   
                                    <Table rowKey={d => d.obid} columns={column1} dataSource={record.backOrderDtos}  pagination={false} />
                                    
                                    
                                    </div>,

                            }}
                            dataSource={status}
                            pagination={{ onChange: page => { console.log(page); }, pageSize: 10, }}
                       
                        />


                    </div>
                </div>
            </div>
        </>
    );
};
export default Order;