import React, { useState, useEffect } from 'react'
import { CoffeeType } from '../../constants'

import styles from './AllMenuPage.module.css'
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

export function AllMenuPage() {
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
        <h4 className={styles.textHeader}>Stock</h4>
      </div>

      <div className={styles.container}>
        <div>
          <NavLink
            to="/updatestock"
            type="updatestock"
            block
            className={styles.button}
          >
            Update Stock
          </NavLink>
          <NavLink
            to="/dashboard"
            type="dashboard"
            block
            className={styles.button}
          >
            Dashboard
          </NavLink>
          <NavLink to="/restock" type="restock" block className={styles.button}>
            Restock
          </NavLink>
          <NavLink to="/order" type="order" block className={styles.button}>
            Stock Order
          </NavLink>
          <NavLink to="/employee" type="order" block className={styles.button}>
            Employee
          </NavLink>
          <NavLink to="/member" type="order" block className={styles.button}>
            Member
          </NavLink>
        </div>
      </div>
    </div>
  )
}
