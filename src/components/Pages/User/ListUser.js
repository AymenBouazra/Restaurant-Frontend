import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

// const ExpandedComponent = ({ data }) => <pre>{data.email}</pre>;



const ListUser = () => {
  const [users, setUsers] = useState([])
  const [pending, setPending] = React.useState(true);
  const Loading =
    <div className="d-flex justify-content-center h-100 align-items-center">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
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
      width: '200px',
      name: 'Actions',
      selector: row => row._id,
      cell: ({ _id }) => <div className='d-flex'>
        <button onClick={() => handleUpdate(_id)} className='btn btn-success me-2'><FontAwesomeIcon icon={faEdit} /></button>
        <button onClick={() => handleDelete(_id)} className='btn btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
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

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:4000/api/users/' + id)
    getUsers()
  }

  const handleUpdate = async (id) => {
    await axios.put('http://localhost:4000/api/users/' + id)
    getUsers()
  }

  const getUsers = async () => {
    const response = await axios.get('http://localhost:4000/api/users')
    setUsers(response.data)
    setPending(false)
  }

  useEffect(() => {
    const controller = new AbortController();
    getUsers()
    return controller.abort()
  }, [])
  return (
    <div className='p-5'>
      <DataTable
        title={<h1 className='text-uppercase mb-5'>Users List</h1>}
        pagination
        columns={columns}
        data={users}
        responsive
        progressPending={pending}
        progressComponent={Loading}
        fixedHeader
        theme="default"
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        fixedHeaderScrollHeight="700px"
        sortIcon={<FontAwesomeIcon className='ms-2' color='lightblue' icon={faChevronUp} />}
        getUsersFn={getUsers}
      />
    </div>
  )
}

export default ListUser