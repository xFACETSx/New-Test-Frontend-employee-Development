import React, { useState, useEffect, useRef } from 'react'
import { CoffeeType } from '../../constants'

import _ from 'lodash'

import styles from './StockAndMenuPage.module.css'
import css from 'classnames'

import { FiEdit, FiTrash2 } from 'react-icons/fi'

import {
  Drawer,
  Radio,
  Select,
  Input,
  Button,
  Table,
  Typography,
  InputNumber,
  Form,
  Row,
  Col,
  Divider,
  notification,
  message,
  Popconfirm,
} from 'antd'

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { Menu } from '../../components/Menu/Menu'

const typeOption = [
  { label: 'Coffee', value: 'COFFEE' },
  { label: 'Soda', value: 'SODA' },
  { label: 'Milk', value: 'MILK' },
]
export function StockAndMenuPage() {
  const [menuList, setMenuList] = useState([])
  const [stockList, setStockList] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDrawerOpenAddMenu, setIsDrawerOpenAddMenu] = useState(false)
  const [isDrawerOpenEditMenu, setIsDrawerOpenEditMenu] = useState(false)
  const [addForm] = Form.useForm()
  const [reStockForm] = Form.useForm()
  const [addStockForm] = Form.useForm()
  const [stockOption, setstockOption] = useState([])
  const [imgUrl, setImgUrl] = useState([])
  const fileRef = useRef()

  const handleUpload = (files) => {
    if (!files.length) {
      notification.error({ message: 'Upload file Error!' })
      return
    }
    _.forEach(files, (f) => {
      const reader = new FileReader()
      reader.onloadend = function () {
        setImgUrl((old) => [...old, reader.result])
      }
      reader.readAsDataURL(f)
    })
  }

  const fetchMenuList = async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_BACKEND + `/menus`)
      console.log(data)

      setMenuList(
        data.map((d) => ({
          ...d,
          ingredients: d.ingredients.map((i) => ({
            ...i,
            quantity: i.use_quantity,
          })),
        }))
      )
    } catch (error) {
      console.log(error)
    }
  }
  const submitForm = async (formValue) => {
    if (!imgUrl.length) {
      notification.warning({ message: 'Please upload Image!' })
      return
    }
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + `/menus`,
        {
          ...formValue,
          image: imgUrl,
        }
      )
      setIsDrawerOpen(false)
      notification.success({ message: 'Add menu Success!' })
      addForm.resetFields()
      fileRef.current.value = ''
      fetchMenuList()
    } catch (error) {
      console.log(error)
    }
  }

  // Stock ----------------------------------------
  const submitFormAddStock = async (formValue) => {
    console.log('testaddfunction')
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + `/stocks/add`,
        {
          stocks: [formValue],
        }
      )
      setIsDrawerOpenAddMenu(false)
      notification.success({ message: 'Add Ingredient Success!' })
      addStockForm.resetFields()
      fetchStocks()
    } catch (error) {
      console.log(error)
    }
  }
  const submitFormEditStock = async (formValue) => {
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_BACKEND + `/stocks/update/${formValue.id}`,
        {
          ...formValue,
        }
      )
      setIsDrawerOpenEditMenu(false)
      notification.success({ message: 'Edit Ingredient Success!' })
      reStockForm.resetFields()
      fetchStocks()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStocks = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND + `/stocks`
      )
      setStockList(data)
      setstockOption(
        data.map((s) => ({
          value: s.id,
          label: s.ingredient_name,
        }))
      )
    } catch (error) {
      console.log(error)
    }
  }

  const deleteIngredient = async () => {
    try {
      const formValue = reStockForm.getFieldsValue()
      const { data: result } = await axios.delete(
        process.env.REACT_APP_BACKEND + `/stocks/${formValue.id}`
      )
      setIsDrawerOpenEditMenu(false)
      notification.success({ message: 'Delete menu Success!' })
      reStockForm.resetFields()
      fetchStocks()
    } catch (error) {
      console.log(error)
    }
  }

  const titleIngredients = [
    {
      title: 'Ingredient Name',
      dataIndex: 'ingredient_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 100,
      align: 'center',
      render: (value) => <div style={{ textAlign: 'right' }}>{value}</div>,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      width: 80,
      align: 'center',
    },
    {
      title: '',
      render: (record) => (
        <div
          className={styles.editStock}
          onClick={() => {
            setIsDrawerOpenEditMenu(true)
            reStockForm.setFieldsValue(record)
          }}
        >
          <FiEdit fontSize={22} />
          Edit
        </div>
      ),
      width: 100,
    },
  ]

  useEffect(() => {
    fetchMenuList()
    fetchStocks()
  }, [])

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Stock & Menu</h4>
      </div>
      <div className={styles.cover}>
        <Row justify="space-between">
          <Col className={styles.title}>
            <h1>Menu</h1>
          </Col>
          <Col>
            <Button
              onClick={() => setIsDrawerOpen(true)}
              style={{
                // color: '#f6f5ef',
                // background: '#c6a07d',
                width: '200px',
                height: '40px',
                fontSize: '16px',
                borderRadius: '4px',
              }}
            >
              + Add Menu
            </Button>
          </Col>
        </Row>
        <div className={styles.coverContainer}>
          {menuList.map((data) => (
            <Menu
              data={data}
              stocks={stockList}
              onEditSuccess={fetchMenuList}
            />
          ))}
        </div>

        <Divider />

        <div className={styles.coverTable}>
          <Form form={reStockForm}>
            <Row justify="space-between">
              <Col className={styles.title}>
                <h1>Stock</h1>
              </Col>
              <Col>
                <Button
                  className={styles.buttonAddIngredient}
                  // style={{
                  //   width: '200px',
                  //   height: '40px',
                  //   fontSize: '16px',
                  //   borderRadius: '4px',
                  // }}
                  type="primary"
                  size="large"
                  onClick={() => setIsDrawerOpenAddMenu(true)}
                >
                  {/* <BsPlusLg /> Add Ingredient */}
                  {'+   '} Add Ingredient
                </Button>
              </Col>
            </Row>
            <Table
              className={styles.table}
              columns={titleIngredients}
              dataSource={stockList}
              pagination={false}
              bordered
              // summary={(pageData) => {
              //   let totalBorrow = 0
              //   let totalRepayment = 0

              //   pageData.forEach(({ borrow, repayment }) => {
              //     totalBorrow += borrow
              //     totalRepayment += repayment
              //   })

              //   return (
              //     <>
              //       <Table.Summary.Row></Table.Summary.Row>
              //     </>
              //   )
              // }}
            />
          </Form>
        </div>

        {/* Drawer stock ---------------------------------*/}
        {/* Edit Ingredient ----------------- */}
        <Drawer
          footer={
            <Popconfirm
              onConfirm={deleteIngredient}
              title="Are you sure?"
              okText="Delete"
              okButtonProps={{ danger: true }}
            >
              <Button type="text" danger block>
                <FiTrash2
                  style={{
                    marginRight: '1rem',
                    fontSize: '16px',
                    marginBottom: '-2px',
                  }}
                />
                Delete Ingredient
              </Button>
            </Popconfirm>
          }
          title={
            <Row justify="space-between" align="middle">
              <Col>Edit Ingredient</Col>
              <Col>
                <Button type="primary" onClick={reStockForm.submit}>
                  Save
                </Button>
              </Col>
            </Row>
          }
          visible={isDrawerOpenEditMenu}
          className={styles.drawerSweet}
          maskClosable={false}
          keyboard={false}
          onClose={() => {
            setIsDrawerOpenEditMenu(false)
          }}
        >
          <Form
            requiredMark={false}
            layout="vertical"
            form={reStockForm}
            onFinish={(value) => {
              submitFormEditStock(value)
            }}
          >
            <Form.Item
              name="id"
              noStyle
              rules={[{ required: true, message: '' }]}
            />
            <Form.Item
              label="Name"
              name="ingredient_name"
              rules={[{ required: true, message: 'Please input Name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: 'Please input Quantity' }]}
            >
              <InputNumber style={{ width: '100%' }} type="number" />
            </Form.Item>
            <Form.Item
              label="Unit"
              name="unit"
              rules={[{ required: true, message: 'Please input Unit' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Drawer>
        {/* Edit Ingredient End ----------------- */}

        {/* Add Ingredient----------------- */}
        <Drawer
          title={
            <Row justify="space-between" align="middle">
              <Col>Add Ingredient</Col>
              <Col>
                <Button type="primary" onClick={addStockForm.submit}>
                  Add
                </Button>
              </Col>
            </Row>
          }
          visible={isDrawerOpenAddMenu}
          className={styles.drawerSweet}
          maskClosable={false}
          keyboard={false}
          onClose={() => {
            setIsDrawerOpenAddMenu(false)
          }}
        >
          <Form
            requiredMark={false}
            layout="vertical"
            form={addStockForm}
            onFinish={(value) => {
              submitFormAddStock(value)
            }}
          >
            {/* <Form.Item
              name="id"
              noStyle
              rules={[{ required: true, message: '' }]}
            /> */}
            <Form.Item
              label="Name"
              name="ingredient_name"
              rules={[{ required: true, message: 'Please input Name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: 'Please input Quantity' }]}
            >
              <InputNumber style={{ width: '100%' }} type="number" />
            </Form.Item>
            <Form.Item
              label="Unit"
              name="unit"
              rules={[{ required: true, message: 'Please input Unit' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Drawer>
        {/* Drawer stock end ---------------------------------*/}

        {/* --------------------------------------------------------------------------------------------------- */}

        {/* Drawer menu ---------------------------------*/}

        <Drawer
          title={
            <Row justify="space-between" align="middle">
              <Col>Add new menu</Col>
              <Col>
                <Button type="primary" onClick={addForm.submit}>
                  Add
                </Button>
              </Col>
            </Row>
          }
          visible={isDrawerOpen}
          className={styles.drawerSweet}
          maskClosable={false}
          keyboard={false}
          onClose={() => {
            fileRef.current.value = ''
            setIsDrawerOpen(false)
          }}
        >
          <Form
            requiredMark={false}
            layout="vertical"
            form={addForm}
            onFinish={(value) => {
              submitForm(value)
            }}
          >
            <input
              ref={fileRef}
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleUpload(e.target.files)
              }}
            />
            <br />
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: '' }]}
            >
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: '' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    type="number"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Sale Price"
                  name="sale_to"
                  rules={[{ required: true, message: '' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    type="number"
                    min={0}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: '' }]}
                >
                  <Select options={typeOption} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: '' }]}
                >
                  <Input.TextArea maxLength={200} showCount rows={6} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Form.List name="ingredients" initialValue={[{ quantity: 1 }]}>
              {(fields, ingredientsList) => (
                <>
                  <Row>
                    <Col span={24}>
                      {fields.map(({ name, ...rest }) => (
                        <>
                          <Row>
                            <Col span={24}>
                              <Form.Item
                                rules={[{ required: true, message: '' }]}
                                label="Ingredient"
                                {...rest}
                                name={[name, 'stock_id']}
                              >
                                <Select options={stockOption} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <Form.Item
                                rules={[{ required: true, message: '' }]}
                                label="Quantity"
                                {...rest}
                                name={[name, 'quantity']}
                              >
                                <InputNumber
                                  min={1}
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>

                          {fields.length > 1 && (
                            <Button
                              onClick={() => ingredientsList.remove(name)}
                              block
                              danger
                              type="text"
                            >
                              <FiTrash2
                                style={{
                                  margin: '0 0.5rem -2px 0',
                                  fontSize: '16px',
                                }}
                              />
                              Remove Ingredient
                            </Button>
                          )}
                          <Divider />
                        </>
                      ))}
                    </Col>
                  </Row>

                  <Button
                    block
                    type="dashed"
                    onClick={() => ingredientsList.add({ quantity: 1 })}
                  >
                    + Add Ingredient
                  </Button>
                </>
              )}
            </Form.List>
          </Form>
        </Drawer>
      </div>
    </div>
  )
}
