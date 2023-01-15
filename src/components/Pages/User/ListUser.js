import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faEdit, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal';
import { Formik } from 'formik'
import { toast } from 'react-toastify'

const ListUser = () => {
  const [users, setUsers] = useState([])
  const [userToUpdate, setUserToUpdate] = useState({})
  const [pending, setPending] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('')
  const Loading = (
    <div className="d-flex justify-content-center h-100 align-items-center">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
  const columns = [
    {
      name: 'Username',
      selector: row => row.userName,
      sortable: true
    },
    {
      name: 'E-mail',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true
    },
    {
      name: 'Photo',
      selector: row => row.photo,
      cell: ({ photo }) => <img src={photo} alt='' width='50' />,
    },
    {
      width: '200px',
      name: 'Actions',
      selector: row => row._id,
      cell: ({ _id }) => <div className='d-flex'>
        <button onClick={() => openModal(_id)} className='btn btn-success me-2 rounded-0'><FontAwesomeIcon icon={faEdit} /></button>
        <button onClick={() => handleDelete(_id)} className='btn btn-danger rounded-0'><FontAwesomeIcon icon={faTrash} /></button>
      </div>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: '1px solid #d8e2dc'
      }
    },
    tableWrapper: {
      style: {
        display: 'table'
      }
    },
    rows: {
      style: {
        fontSize: "16px",

      },
      highlightOnHoverStyle: {
        '&:nth-of-type(n)': {
          backgroundColor: '#edf2fb',
          transitionDuration: '0.5s',
          transitionProperty: '#ddf0f8',
          outlineStyle: 'solid',
          outlineWidth: '0px',
        }
      },
    },
    headCells: {
      style: {
        fontSize: '16px'
      }
    },
  }

  const modalStyles = {
    content: {
      borderRadius: '10px',
      top: '50%',
      left: '50%',
      width: '50%',
      minHeight: '700px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement("*");

  const openModal = async (id) => {
    const response = await axios.get('http://localhost:4000/api/users/' + id)
    setUserToUpdate(response.data)
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:4000/api/users/' + id)
    getUsers()
  }

  const getUsers = async () => {
    const response = await axios.get('http://localhost:4000/api/users')
    setUsers(response.data)
    setPending(false)
  }

  const filteredItems = users.filter(user => user.userName.toLowerCase().includes(filterText.toLowerCase()) || user.email.toLowerCase().includes(filterText.toLowerCase()) ||user.role.toLowerCase().includes(filterText.toLowerCase()) )
  const searchText = (e) => {
    setFilterText(e.target.value)
  }
  const subHeaderComponent = (
    <div className='d-flex w-25'>
      <input onChange={searchText} className='form-control rounded-0' value={filterText} placeholder='Search' />
      <button className='btn btn-secondary rounded-0' onClick={() => setFilterText('')}>
        <FontAwesomeIcon color='white' icon={faXmark} size='xl' />
      </button>
    </div>
  )

  useEffect(() => {
    const controller = new AbortController();
    getUsers()
    return controller.abort()
  }, [filterText])
  return (
    <div className="card m-4">
      <div className="card-header">
        <h1 className='text-dark ps-5'>Users List</h1>
      </div>
      <div className="card-body">
        <DataTable
          subHeader
          pagination
          columns={columns}
          data={filteredItems}
          responsive
          progressPending={pending}
          progressComponent={Loading}
          theme="default"
          customStyles={customStyles}
          highlightOnHover
          subHeaderComponent={subHeaderComponent}
          fixedHeaderScrollHeight="700px"
          sortIcon={<FontAwesomeIcon className='ms-2' color='lightblue' icon={faChevronUp} />}
          getUsersFn={getUsers}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          ariaHideApp={false}
          contentLabel="Update Modal"
        >
          <div>Update user here<FontAwesomeIcon onClick={closeModal} icon={faXmark} className='float-end cursor-pointer p-2' /></div>
          <Formik
            initialValues={userToUpdate || { userName: '', email: '', password:'', role: '' }}
            validate={values => {
              const errors = {};
              if (!values.userName) {
                errors.userName = 'Required';
              }
              if (!values.role) {
                errors.role = 'Required';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              try {
                const response = await axios.put('http://localhost:4000/api/users/' + userToUpdate._id, values)
                getUsers()
                closeModal()
                toast.success(response.data.message)
                return true
              } catch (error) {
                toast.error(error.response.data.message)
              }
            }}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className='d-flex flex-column w-100 p-4'>
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
                <p className='text-danger px-4 py-2'>{errors.userName && touched.userName && errors.userName}</p>
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className='text-danger px-4 py-2'>{errors.email && touched.email && errors.email}</p>
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                />
                <p className='text-danger px-4 py-2'>{errors.role && touched.role && errors.role}</p>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className='text-danger px-4 py-2'>{errors.password && touched.password && errors.password}</p>
                <button type="submit" className='btn btn-success'>
                  Update user
                </button>
              </form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  )
}

export default ListUser