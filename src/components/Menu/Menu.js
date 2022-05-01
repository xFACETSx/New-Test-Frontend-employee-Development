import { useState, useEffect, useRef } from 'react'

import styles from './Menu.module.css'

import { useHistory } from 'react-router-dom'

import axios from 'axios'
import _ from 'lodash'

import {
  Button,
  Drawer,
  Form,
  Popconfirm,
  Row,
  Col,
  Input,
  Upload,
  notification,
  Select,
  Divider,
  InputNumber,
} from 'antd'

import { IoCartOutline } from 'react-icons/io5'
// import { GrCart } from 'react-icons/gr'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

// import { CgShoppingCart } from 'react-icons/cg'

const typeOption = [
  { label: 'Coffee', value: 'COFFEE' },
  { label: 'Soda', value: 'SODA' },
  { label: 'Milk', value: 'MILK' },
]

export function Menu({ data, stocks, onEditSuccess }) {
  // move to next page
  const history = useHistory()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [stockOption, setstockOption] = useState([])
  const [imgUrl, setImgUrl] = useState([])
  const [editForm] = Form.useForm()
  const fileRef = useRef()
  const [oldImgCount, setOldImgCount] = useState(0)

  const handleUpload = (files) => {
    if (!files.length) {
      notification.error({ message: 'Upload file Error!' })
      return
    }
    setImgUrl([])
    _.forEach(files, (f) => {
      const reader = new FileReader()
      reader.onloadend = function () {
        setImgUrl((old) => [...old, reader.result])
      }
      reader.readAsDataURL(f)
    })
  }

  const fetchMenuDetail = async (name) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND + `/menus/${name}`
      )
      console.log(data)

      setImgUrl(data.map((d) => d.img))
      setOldImgCount(data.length)
    } catch (error) {
      console.log(error)
    }
  }
  const submitForm = async (formValue) => {
    try {
      const { data: result } = await axios.put(
        process.env.REACT_APP_BACKEND + `/menus/${data.id}`,
        {
          ...formValue,
          image: imgUrl,
        }
      )
      setIsDrawerOpen(false)
      notification.success({ message: 'Edit menu Success!' })
      editForm.resetFields()
      fileRef.current.value = ''
      onEditSuccess()
    } catch (error) {
      console.log(error)
    }
  }
  const deleteMenu = async () => {
    try {
      const formValue = editForm.getFieldsValue()
      const { data: result } = await axios.delete(
        process.env.REACT_APP_BACKEND + `/menus/${formValue.id}`
      )
      setIsDrawerOpen(false)
      notification.success({ message: 'Delete menu Success!' })
      editForm.resetFields()
      onEditSuccess()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data) {
      fetchMenuDetail(data.name)
      editForm.setFieldsValue(data)
    }
  }, [data])

  useEffect(() => {
    setstockOption(
      stocks.map((s) => ({
        value: s.id,
        label: s.ingredient_name,
      }))
    )
  }, [stocks])

  return (
    <div className={styles.container}>
      <div>
        <img src={data.img} className={styles.img} />
      </div>
      {data.sale_to !== data.price && <div className={styles.sale}>sale</div>}

      <div className={styles.coverDetail}>
        <div className={styles.coverNameAndPrice}>
          <span className={styles.name}>{data.name}</span>
          {/* <div className={styles.rateCustom}>
          <Rate
            disabled
            defaultValue={data.star}
            className={styles.star}
          />
        </div> */}

          {data.sale_to !== data.price ? (
            <div className={styles.coverPriceSaleTo}>
              <span className={styles.priceSaleTo}>{data.price}&nbsp;Baht</span>
              <span className={styles.price}>{data.sale_to}&nbsp;Baht</span>
            </div>
          ) : (
            <span className={styles.price}>{data.price}&nbsp;Baht</span>
          )}
        </div>
        <div
          className={styles.button}
          onClick={(e) => {
            e.stopPropagation()
            setIsDrawerOpen(true)
          }}
        >
          <div className={styles.icon}>
            <FiEdit />
          </div>
          <span className={styles.textButton}>Edit Menu</span>
        </div>
      </div>
      <Drawer
        title={
          <Row justify="space-between" align="middle">
            <Col>Edit Menu</Col>
            <Col>
              <Button type="primary" onClick={editForm.submit}>
                Save
              </Button>
            </Col>
          </Row>
        }
        footer={
          <Popconfirm
            onConfirm={deleteMenu}
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
              Delete Menu
            </Button>
          </Popconfirm>
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
          initialValues={{
            ...data,
            ingredients: _.get(data, 'ingredients.length')
              ? data.ingredients
              : [{ quantity: 1 }],
          }}
          layout="vertical"
          form={editForm}
          onFinish={(value) => {
            submitForm(value)
          }}
        >
          <div>current Image count : {imgUrl.length}</div>
          {/* <img src={imgUrl[0]} /> */}

          <input
            multiple
            ref={fileRef}
            // style={{ backgroundColor: '#c6a07d' }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleUpload(e.target.files)
            }}
          />
          <br />
          <Form.Item name="id" noStyle />
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Price" name="price">
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sale Price" name="sale_to">
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Type" name="type">
                <Select options={typeOption} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Description" name="description">
                <Input.TextArea maxLength={200} showCount rows={6} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.List name="ingredients">
            {(fields, ingredientsList) => (
              <>
                <Row>
                  <Col span={24}>
                    {fields.map(({ name, ...rest }) => (
                      <>
                        <Row>
                          <Col span={24}>
                            <Form.Item
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
                              label="Quantity"
                              {...rest}
                              name={[name, 'quantity']}
                            >
                              <InputNumber min={1} style={{ width: '100%' }} />
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
  )
}
