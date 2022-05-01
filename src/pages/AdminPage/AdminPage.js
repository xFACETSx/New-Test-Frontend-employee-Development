import styles from './AdminPage.module.css'
import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import {
  Tabs,
  Table,
  Button,
  Col,
  Row,
  Form,
  Input,
  InputNumber,
  Drawer,
  Popconfirm,
  notification,
} from 'antd'

import { FiEdit, FiTrash2 } from 'react-icons/fi'

const { TextArea } = Input

export function AdminPage() {
  const { TabPane } = Tabs

  const [employeesList, setEmployeesList] = useState([])
  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [isDrawerOpenEditEmployee, setIsDrawerOpenEditEmployee] =
    useState(false)
  const [isDrawerOpenAddEmployee, setIsDrawerOpenAddEmployee] = useState(false)

  const [imgUrl, setImgUrl] = useState([])
  const fileRef = useRef()

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

  const submitFormAddEmployee = async (formValue) => {
    if (!imgUrl.length) {
      notification.warning({ message: 'Please upload Image!' })
      return
    }
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + `/employees`,
        {
          ...formValue,
          image: imgUrl[0],
        }
      )
      setIsDrawerOpenAddEmployee(false)
      notification.success({ message: 'Add employee Success!' })
      addForm.resetFields()
      fileRef.current.value = ''
      fetchEmployees()
    } catch (error) {
      console.log(error)
    }
  }
  const submitFormEditEmployee = async (formValue) => {
    if (!imgUrl.length) {
      notification.warning({ message: 'Please upload Image!' })
      return
    }
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_BACKEND + `/employees/${formValue.id}`,
        {
          ...formValue,
          image: imgUrl[0],
        }
      )
      setIsDrawerOpenEditEmployee(false)
      notification.success({ message: 'Edit employee Success!' })
      editForm.resetFields()
      fileRef.current.value = ''
      fetchEmployees()
    } catch (error) {
      console.log(error)
    }
  }
  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND + `/employees`
      )
      setEmployeesList(data)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteEmployee = async () => {
    try {
      const formValue = editForm.getFieldsValue()
      const { data: result } = await axios.delete(
        process.env.REACT_APP_BACKEND + `/employees/delete/${formValue.id}`
      )
      setIsDrawerOpenEditEmployee(false)
      notification.success({ message: 'Delete menu Success!' })
      editForm.resetFields()
      fetchEmployees()
    } catch (error) {
      console.log(error)
    }
  }

  const titleEmployee = [
    {
      title: 'Picture',
      dataIndex: 'img',
      render: (value) => {
        return <img src={value} className={styles.imgEmployee} />
      },
      width: 40,
      align: 'center',
    },
    {
      title: 'First name',
      dataIndex: 'firstname',
    },
    {
      title: 'Last name',
      dataIndex: 'lastname',
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   width: 40,
    //   align: 'center',
    // },
    {
      title: 'Phone No.',
      dataIndex: 'phone_no',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
    },
    {
      title: 'Login',
      dataIndex: 'login',
      align: 'center',
      width: 100,
    },
    {
      title: 'Logout',
      dataIndex: 'logout',
      align: 'center',
      width: 100,
    },
    {
      title: '',
      render: (record) => (
        <div
          className={styles.editEmployee}
          onClick={() => {
            setIsDrawerOpenEditEmployee(true)
            editForm.setFieldsValue(record)
            setImgUrl([record.img])
            console.log(record.id)
          }}
        >
          <FiEdit fontSize={22} />
          Edit
        </div>
      ),
      width: 100,
    },
  ]

  const titleMember = [
    {
      title: 'Picture',
      dataIndex: 'img',
      render: (value) => {
        console.log('testsefsfwef', value)
        return <img src={value} />
      },
    },
    {
      title: 'First name',
      dataIndex: 'firstname',
    },
    {
      title: 'Last name',
      dataIndex: 'lastname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_no',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    // },
  ]

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div>
      <div className={styles.coverHeader}>
        <div className={styles.imgHeader}></div>
        <h4 className={styles.textHeader}>Employee & Member</h4>
      </div>
      <div className={styles.cover}>
        <Tabs defaultActiveKey="1" type="card" size="small">
          <TabPane tab="Employee" key="1">
            <div className={styles.coverTable}>
              <Form>
                <Table
                  className={styles.table}
                  columns={titleEmployee}
                  dataSource={employeesList}
                  pagination={false}
                  bordered
                />
                <div className={styles.coverButton}>
                  <Button
                    className={styles.buttonReStock}
                    type="primary"
                    size="large"
                    onClick={() => setIsDrawerOpenAddEmployee(true)}
                  >
                    + Add Employee
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Member" key="2">
            <div className={styles.coverTable}>
              <Form>
                <Table
                  className={styles.table}
                  columns={titleMember}
                  dataSource={[]}
                  pagination={false}
                  bordered
                />
                {/* <div className={styles.coverButton}>
                  <Button
                    className={styles.buttonReStock}
                    type="primary"
                    size="large"
                  >
                    ReStock
                  </Button>
                </div> */}
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>

      <Drawer
        footer={
          <Popconfirm
            onConfirm={deleteEmployee}
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
              Delete Employee
            </Button>
          </Popconfirm>
        }
        title={
          <Row justify="space-between" align="middle">
            <Col>Edit Employee</Col>
            <Col>
              <Button type="primary" onClick={editForm.submit}>
                Save
              </Button>
            </Col>
          </Row>
        }
        visible={isDrawerOpenEditEmployee}
        className={styles.drawerSweet}
        maskClosable={false}
        keyboard={false}
        onClose={() => {
          fileRef.current.value = ''
          setIsDrawerOpenEditEmployee(false)
        }}
      >
        <Form
          requiredMark={false}
          layout="vertical"
          form={editForm}
          onFinish={(value) => {
            submitFormEditEmployee(value)
          }}
        >
          {/* show img  */}
          <div
            style={{
              height: '200px',
              overflowX: 'auto',
              display: 'flex',
              gap: '1rem',
            }}
          >
            {!imgUrl.length ? (
              <div>Please select Img</div>
            ) : (
              imgUrl.map((i) => (
                <img src={i} style={{ width: '200px', objectFit: 'cover' }} />
              ))
            )}
          </div>
          <br />
          {/* show img end */}
          <input
            ref={fileRef}
            // multiple
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleUpload(e.target.files)
            }}
          />
          <br />
          <Form.Item name="id" noStyle />
          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[{ required: true, message: 'Please input Firstname' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: 'Please input Lastname' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input Age' }]}
          >
            <Input style={{ width: '100%' }} type="number" allowClear />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone_no"
            rules={[{ required: true, message: 'Please input Phone number' }]}
          >
            <Input type="number" allowClear />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'The input is Invalid E-mail!',
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title={
          <Row justify="space-between" align="middle">
            <Col>Add Employee</Col>
            <Col>
              <Button type="primary" onClick={addForm.submit}>
                Add
              </Button>
            </Col>
          </Row>
        }
        visible={isDrawerOpenAddEmployee}
        className={styles.drawerSweet}
        maskClosable={false}
        keyboard={false}
        onClose={() => {
          fileRef.current.value = ''
          setIsDrawerOpenAddEmployee(false)
        }}
      >
        <Form
          requiredMark={false}
          layout="vertical"
          form={addForm}
          onFinish={(value) => {
            submitFormAddEmployee(value)
          }}
        >
          {/* show img  */}
          <div
            style={{
              height: '200px',
              overflowX: 'auto',
              display: 'flex',
              gap: '1rem',
            }}
          >
            {!imgUrl.length ? (
              <div>Please select Img</div>
            ) : (
              imgUrl.map((i) => (
                <img src={i} style={{ width: '200px', objectFit: 'cover' }} />
              ))
            )}
          </div>
          <br />
          {/* show img  end*/}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleUpload(e.target.files)
            }}
          />
          <br />
          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[{ required: true, message: 'Please input Firstname' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: 'Please input Lastname' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input Age' }]}
          >
            <Input style={{ width: '100%' }} type="number" allowClear />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone_no"
            rules={[{ required: true, message: 'Please input Phone number' }]}
          >
            <Input type="number" allowClear />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'The input is Invalid E-mail!',
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
