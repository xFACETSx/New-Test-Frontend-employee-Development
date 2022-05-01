import React, { useState, useEffect } from 'react'
import { CoffeeType } from '../../constants'

import styles from './RestockPage.module.css'
import css from 'classnames'
import { Restock } from '../../components/Restock/Restock'

import { CgSearch } from 'react-icons/cg'

import { Radio, Select, Input, Button, Table, Typography, InputNumber, Menu, Dropdown, message, Space, Tooltip } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import axios from 'axios'

const { Option } = Select
const { Text } = Typography;

export function RestockPage() {
  const [restockList, setRestockList] = useState([])
  const [filterRestockList, setFilterRestockList] = useState([])

  const columns = [
    {
      title: 'Ingredient Name',
      dataIndex: 'name',
    },
    {
      title: 'Old Quantity',
      dataIndex: 'old',
    },
    {
      title: 'New Quantity',
      dataIndex: 'new',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Condensed Milk',
      old: 20,
      new: <InputNumber min={1} max={10} defaultValue={1} />,
    },
    {
      key: '2',
      name: 'Sugar',
      old: 100,
      new: <InputNumber min={1} max={10} defaultValue={1} />,
    },
    {
      key: '3',
      name: 'Soda',
      old: 10,
      new: <InputNumber min={1} max={10} defaultValue={1} />,
    },
    {
      key: '4',
      name: 'Whipcream',
      old: 65,
      new: <InputNumber min={1} max={10} defaultValue={1} />,
    },
    {
      key: '5',
      name: 'Coffee',
      old: 70,
      new: <InputNumber min={1} max={10} defaultValue={1} />,
    },
    {
      key: '6',
      name: 'Milk',
      old: 20,
      new: <InputNumber min={1} max={10} defaultValue={1} />,
    },
  ];

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Restock</h4>
      </div>
      <div className={styles.bgColor}>
        <div className={styles.container}>
          <div style={{ marginLeft: '120px', marginRight: '120px' }}>
          <Dropdown overlay={menu}>
          <Button>
            Button <DownOutlined />
          </Button>
          </Dropdown>
            <br />
            <br />
            <Table
              className='ant-table-wrapper'
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              summary={pageData => {
                let totalBorrow = 0;
                let totalRepayment = 0;

                pageData.forEach(({ borrow, repayment }) => {
                  totalBorrow += borrow;
                  totalRepayment += repayment;
                });

                return (
                  <>
                    <Table.Summary.Row>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
            <br />
            <Button style={{ float: 'right', backgroundColor: 'var(--brownlight)', marginLeft: '10px', width: '150px' }} type="primary">ORDER</Button>
            <Button style={{ float: 'right', backgroundColor: 'white', color: 'var(--brownlight)', width: '150px' }} type="primary">RESET</Button>
          </div>

          <div className={styles.restockList}>
            {filterRestockList.map((eachData) => (
              <Restock data={eachData} key={eachData.id} />
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}
