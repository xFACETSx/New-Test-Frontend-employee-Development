import React, { useState, useEffect } from 'react'
import { CoffeeType } from '../../constants'

import styles from './MemberPage.module.css'
import css from 'classnames'
import { Member } from '../../components/Member/Member'

import { CgSearch } from 'react-icons/cg'

import { Radio, Select, Input, Button, Table, Typography, Tag, Space, Avatar, Image } from 'antd' ;
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

export function MemberPage() {
  const [memberList, setMemberList] = useState([])
  const [filterMemberList, setFilterMemberList] = useState([])
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
      title: 'Rank',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'classic' : 'green';
            if (tag === 'classic') {
              color = 'brown';
            }
            if (tag === 'silver') {
              color = 'silver';
            }
            if (tag === 'gold') {
              color = 'gold';
            }
            if (tag === 'platinum') {
              color = 'blue';
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
  
  const data = [
    {
      key: '1',
      photo: <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 48 }} />} />,
      name: 'John Brown',
      number: 981234455,
      tags: ['classic'],
      date: ['22/07/2564'],
    },
    {
      key: '2',
      photo: <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 48 }} />} />,
      name: 'Jim Green',
      number: 954568855,
      tags: ['silver'],
      date: ['02/04/2564'],
    },
    {
      key: '3',
      photo: <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 48 }} />} />,
      name: 'Joe Black',
      number: 914512236,
      tags: ['gold'],
      date: ['12/03/2564'],
    },
    {
      key: '4',
      photo: <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 48 }} />} />,
      name: 'Jim Green',
      number: 954568855,
      tags: ['platinum'],
      date: ['21/04/2564'],
    },
  ];

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Member</h4>
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
          </div>
          
          <div className={styles.memberList}>
            {filterMemberList.map((eachData) => (
              <Member data={eachData} key={eachData.id} />
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}
