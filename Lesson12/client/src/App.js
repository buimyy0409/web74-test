import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table } from 'antd';
function App() {
  const [users, setUsers] = useState([])

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fname',
      key: 'fname',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'User name',
      dataIndex: 'uname',
      key: 'uname',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    }
  ];

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      const resp = await axios.get('http://localhost:3002/user/all');
      if (resp && resp.data) {
        setUsers(resp.data.data)
      }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="App">
        <Table columns={columns} dataSource={users} />;
    </div>
  );
}

export default App;
