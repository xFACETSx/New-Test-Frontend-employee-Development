import React, { useState, useEffect } from 'react'
import { CoffeeType } from '../../constants'

import styles from './HomePage.module.css'
import css from 'classnames'
import { Stock } from '../../components/Stock/Stock'

import { CgSearch } from 'react-icons/cg'

import {
  Radio,
  Select,
  Input,
  Button,
  Table,
  Typography,
  InputNumber,
} from 'antd'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import axios from 'axios'
import { NavLink } from 'react-router-dom'

const { Option } = Select
const { Text } = Typography

export function HomePage() {
  const [stockList, setStockList] = useState([])
  const [filterStockList, setFilterStockList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [sortBy, setSortBy] = useState('recommend')

  const columns = []

  const data = []

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Home</h4>
      </div>

      <div className={styles.container}>
        <NavLink to="/order" block className={styles.button}>
          Customer Order
        </NavLink>
        <NavLink to="/stockandmenu" block className={styles.button}>
          Stock And Menu
        </NavLink>
        <NavLink to="/admin" block className={styles.button}>
          Employee & Member
        </NavLink>
        {/* <NavLink to="/updatestock" block className={styles.button}>
          Update Stock
        </NavLink>
        <NavLink to="/dashboard" block className={styles.button}>
          Dashboard
        </NavLink>
        <NavLink to="/restock" block className={styles.button}>
          Restock
        </NavLink>

        <NavLink to="/allmenu" block className={styles.button}>
          Menu
        </NavLink> */}
        {/* <NavLink to="/employee" block className={styles.button}>
          Employee
        </NavLink>
        <NavLink to="/member" block className={styles.button}>
          Member
        </NavLink> */}
      </div>
    </div>
  )
}
