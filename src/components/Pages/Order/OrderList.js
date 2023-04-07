import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import orderService from '../../../services/orderServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronUp, faClock, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';
const OrderList = () => {
    const [orders, setOrder] = useState([])
    const [pending, setPending] = useState(true);
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
            width: '100px',
            name: '',
            cell: ({ _id }) => <button onClick={() => handleDelete(_id)} title='Delete order' className='btn'><FontAwesomeIcon icon={faTrash} /></button>,
            sortable: true
        },
        {
            width: '200px',
            name: 'Order number',
            selector: row => row.orderNumber,
            cell: ({ orderNumber }) => <strong className='h3'>{orderNumber}</strong>,
            sortable: true
        },
        {
            name: 'Food ordered',
            selector: row => row.cartItems,
            cell: ({ cartItems }) => <div className='d-flex flex-column'>
                <ul>
                    {cartItems.map((item, index) => {
                        return (
                            <li key={index} type='circle'>
                                <h5>{item.foodName} x<strong className='text-danger'>{item.cartQuantity}</strong></h5>
                            </li>
                        )
                    })}
                </ul>
                <span></span>

            </div>,
            sortable: true
        },
        {
            name: 'Total price',
            selector: row => row.cartTotalAmount,
            cell: ({ cartTotalAmount }) => <strong className='text-danger'>{cartTotalAmount}.00 Dt</strong>,
            sortable: true
        },
        {
            name: 'Time',
            selector: row => row.createdAt,
            cell: ({ createdAt }) => {
                const time = new Date(createdAt)
                let minutes = time.getMinutes()
                minutes = minutes < 10 ? '0' + minutes : minutes
                const dateFormat = time.getHours() + ":" + minutes + ", " + time.toDateString();
                return (<div className='text-muted' title={dateFormat}>{dateFormat}</div>)
            },
            sortable: true
        },
        {
            width: '200px',
            name: 'Status',
            selector: row => row.status,
            cell: ({ _id, status }) => <div className='d-flex'>
                <button onClick={() => {
                    orderService.confirmOrder(_id);
                    window.location.reload()
                }} className={`btn ${status === "Pending" ? 'btn-warning text-light' : 'btn-success'} me-2 rounded-0`}>
                    <strong>{status} {status === 'Pending' ? <FontAwesomeIcon icon={faClock} /> : <FontAwesomeIcon icon={faCheck} />}</strong>
                </button>

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            sortable: true
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
        await orderService.removeOne(id)
        getOrder()
    }

    const getOrder = async () => {
        const response = await orderService.getAllOrder()
        setOrder(response.data)
        setPending(false)
    }
    const sortedOrders = orders.sort((a, b) => b.orderNumber - a.orderNumber)
    const filteredItems = sortedOrders.filter(order => order.orderNumber.toString().includes(filterText) || order.status.toLowerCase().includes(filterText.toLowerCase()))
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
        getOrder()
        return controller.abort()
    }, [filterText])
    return (
        <div className="card m-4">
            <div className="card-header">
                <h1 className='text-dark ps-5'>Orders list</h1>
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
                />
            </div>
        </div>
    )
}

export default OrderList