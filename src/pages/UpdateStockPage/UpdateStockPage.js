import React, { useState, useEffect } from 'react'
import { CoffeeType } from '../../constants'

import styles from './UpdateStockPage.module.css'
import css from 'classnames'
import { UpdateStock } from '../../components/UpdateStock/UpdateStock'

import { CgSearch } from 'react-icons/cg'

import { Radio, Select, Input, Button, Table, Typography, InputNumber } from 'antd'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

/*import img7 from '../../picture/img7.jpeg'
import img8 from '../../picture/img8.jpeg'
import img9 from '../../picture/img19.jpeg'
import img13 from '../../picture/img13.jpeg'
import img17 from '../../picture/img17.jpeg'*/
import axios from 'axios'

const { Option } = Select
const { Text } = Typography;

export function UpdateStockPage() {
  const [updateStockList, setUpdateStockList] = useState([])
  const [filterUpdateStockList, setFilterUpdateStockList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [sortBy, setSortBy] = useState('recommend')
  // const [ingredient, setIngredient] = useState(true)
  // const [ingredient, setIngredient] = useState(false)

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

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Update Stock</h4>
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
            <br />
            <Button style={{ float: 'right', backgroundColor: 'var(--brownlight)', marginLeft: '10px', width: '150px' }} type="primary">UPDATE</Button>
            <Button style={{ float: 'right', backgroundColor: 'white', color: 'var(--brownlight)', width: '150px' }} type="primary">RESET</Button>
          </div>

          <div className={styles.updateStockList}>
            {filterUpdateStockList.map((eachData) => (
              <UpdateStock data={eachData} key={eachData.id} />
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}
