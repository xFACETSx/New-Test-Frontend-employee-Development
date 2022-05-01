import React, { useState, useEffect } from 'react'
import { CoffeeType } from '../../constants'

import styles from './DashboardPage.module.css'
import css from 'classnames'
import { Dashboard } from '../../components/Dashboard/Dashboard'

import { CgSearch } from 'react-icons/cg'

import { Radio, Select, Input, Button, Table, Typography, InputNumber } from 'antd'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import axios from 'axios'

const { Option } = Select
const { Text } = Typography;

export function DashboardPage() {
  const [dashboardList, setDashboardList] = useState([])
  const [filterDashboardList, setFilterDashboardList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [sortBy, setSortBy] = useState('recommend')
  // const [ingredient, setIngredient] = useState(true)
  // const [ingredient, setIngredient] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Out of date',
          value: 'Out of date',
        },
        {
          text: 'High stock',
          value: 'High stock',
        },
        {
          text: 'Low stock',
          value: 'Low stock',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.address.startsWith(value),
      width: '30%',
    },

    {
      title: 'Quantity',
      dataIndex: 'old',
      sorter: {
        compare: (a, b) => a.old - b.old,
        multiple: 1,
      },
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Condensed Milk',
      old: 20,
    },
    {
      key: '2',
      name: 'Sugar',
      old: 100,
    },
    {
      key: '3',
      name: 'Soda',
      old: 10,
    },
    {
      key: '4',
      name: 'Whipcream',
      old: 65,
    },
    {
      key: '5',
      name: 'Coffee',
      old: 70,
    },
    {
      key: '6',
      name: 'Milk',
      old: 20,
    },
  ];

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Dashboard</h4>
      </div>
      <div className={styles.bgColor}>
        <div className={styles.container}>
          <div style={{ marginLeft: '120px', marginRight: '120px' }}>
            <Radio style={{ float: 'right', color: 'var(--brownlight)', marginLeft: '20px' }}>Packaging</Radio>
            <Radio style={{ float: 'right', color: 'var(--brownlight)' }}>ingredient</Radio>
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
          </div>

          <div className={styles.DashboardList}>
            {filterDashboardList.map((eachData) => (
              <Dashboard data={eachData} key={eachData.id} />
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

