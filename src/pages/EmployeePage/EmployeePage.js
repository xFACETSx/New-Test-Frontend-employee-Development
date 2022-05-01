import React, { useState, useEffect } from 'react'
import { CoffeeType } from '../../constants'

import styles from './EmployeePage.module.css'
import css from 'classnames'
import { Employee } from '../../components/Employee/Employee'

import { CgSearch } from 'react-icons/cg'

import { Radio, Select, Input, Button, Table, Typography, Tag, Space, Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import axios from 'axios'

/*import img7 from '../../picture/img7.jpeg'
import img8 from '../../picture/img8.jpeg'
import img9 from '../../picture/img19.jpeg'
import img13 from '../../picture/img13.jpeg'
import img17 from '../../picture/img17.jpeg'*/

const { Option } = Select
const { Text } = Typography;

export function EmployeePage() {
  const [employeeList, setEmployeeList] = useState([])
  const [filterEmployeeList, setFilterEmployeeList] = useState([])
  // const [searchText, setSearchText] = useState('')
  // const [filterBy, setFilterBy] = useState('')
  // const [sortBy, setSortBy] = useState('recommend')
  // const [ingredient, setIngredient] = useState(true)
  // const [ingredient, setIngredient] = useState(false)

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mobile(+66)',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'online' : 'green';
            if (tag === 'offline') {
              color = 'red';
            }
            if (tag === 'online') {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Login',
      dataIndex: 'in',
      key: 'in',
    },
    {
      title: 'Logout',
      dataIndex: 'out',
      key: 'out',
    },
  ];
  
  const data = [
    {
      key: '1',
      photo: <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 48 }} />} />,
      name: 'John Brown',
      number: 981234455,
      tags: ['online'],
      in: '9:00',
      out: '12:30',
    },
    {
      key: '2',
      photo: <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 48 }} />} />,
      name: 'Jim Green',
      number: 954568855,
      tags: ['offline'],
      in: '-',
      out: '-',
    },
    {
      key: '3',
      photo: <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 48 }} />} />,
      name: 'Joe Black',
      number: 914512236,
      tags: ['online'],
      in: '10:00',
      out: '-',
    },
  ];

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Employee</h4>
      </div>
      <div className={styles.bgColor}>
        <div className={styles.container}>
          <div style={{ marginLeft: '120px', marginRight: '120px' }}>
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
            <Button style={{ float: 'right', backgroundColor: 'var(--brownlight)', marginLeft: '10px', width: '150px' }} type="primary">Add new</Button>
          </div>

          <div className={styles.employeeList}>
            {filterEmployeeList.map((eachData) => (
              <Employee data={eachData} key={eachData.id} />
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}
