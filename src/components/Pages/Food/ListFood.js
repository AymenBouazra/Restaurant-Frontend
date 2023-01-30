import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faEdit, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal';
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import foodService from '../../../services/foodServices'
const ListFood = () => {
  const [foods, setFood] = useState([])
  const [foodToUpdate, setFoodToUpdate] = useState({})
  const [pending, setPending] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('')
  const [photo, setPhoto] = useState()
  const onFileSelect = ({ currentTarget }) => {
    setPhoto(currentTarget.files[0])

  }
  const Loading = (
    <div className="d-flex justify-content-center h-100 align-items-center">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
  const columns = [
    {
      name: 'Food name',
      selector: row => row.foodName,
      sortable: true
    },
    {
      name: 'Prices',
      selector: row => row.priceMega,
      cell: ({ priceMega, priceGiga, pricePeta, priceTera}) => <div className='d-flex flex-column'>
        <span><span style={{width:'100px', fontSize:'18px' , fontWeight:500}}>Mega:</span> <strong className='text-danger'>{priceMega} Dt</strong></span>
        <span><span style={{width:'100px', fontSize:'18px' , fontWeight:500}}>Giga:</span> <strong className='text-danger'>{priceGiga} Dt</strong></span>
        <span><span style={{width:'100px', fontSize:'18px' , fontWeight:500}}>Peta:</span> <strong className='text-danger'>{pricePeta} Dt</strong></span>
        <span><span style={{width:'100px', fontSize:'18px' , fontWeight:500}}>Tera:</span> <strong className='text-danger'>{priceTera} Dt</strong></span>
      </div>,
      sortable: true
    },
    {
      name: 'Photo',
      selector: row => row.photo,
      cell: ({ photo }) => <img src={photo} alt='' className='rounded-4' width='100' />,
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
      minHeight: '65%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement("*");

  const openModal = async (id) => {
    const response = await foodService.getOne(id)
    setFoodToUpdate(response.data)
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  const handleDelete = async (id) => {
    await foodService.removeOne(id)
    getFood()
  }

  const getFood = async () => {
    const response = await foodService.getAllFood()
    setFood(response.data)
    setPending(false)
  }

  const filteredItems = foods.filter(food => food.foodName.toLowerCase().includes(filterText.toLowerCase()))
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
    getFood()
    return controller.abort()
  }, [filterText])
  return (
    <div className="card m-4">
      <div className="card-header">
        <h1 className='text-dark ps-5'>food List</h1>
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          ariaHideApp={false}
          contentLabel="Update Modal"
        >
          <div>Update food here<FontAwesomeIcon onClick={closeModal} icon={faXmark} className='float-end cursor-pointer p-2' /></div>
          <Formik
            initialValues={foodToUpdate ||{ foodName: '', description: '', priceMega: '',priceGiga: '',pricePeta: '',priceTera: '' }}
            validate={values => {
              const errors = {};
              if (!values.foodName) {
                errors.foodName = 'Required';
              }
              if (!values.priceMega) {
                errors.priceMega = 'Required';
              }
              if (!values.priceGiga) {
                errors.priceGiga = 'Required';
              }
              if (!values.pricePeta) {
                errors.pricePeta = 'Required';
              }
              if (!values.priceTera) {
                errors.priceTera = 'Required';
              }
              if (!values.description) {
                errors.description = 'Required';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              try {
                let formData = new FormData();
                Object.keys(values).forEach(fieldName => {
                  formData.append(fieldName, values[fieldName]);
                });
                photo && formData.append("photo", photo, photo.name);
                const response = await foodService.updateOne(foodToUpdate._id, formData)
                getFood()
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
                <label>foodName</label>
              <input
                type="text"
                name="foodName"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.foodName}
              />
              <p className='text-danger px-4 py-2'>{errors.foodName && touched.foodName && errors.foodName}</p>
              <label>Description</label>
              <input
                type="text"
                name="description"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <p className='text-danger px-4 py-2'>{errors.description && touched.description && errors.description}</p>
              <label>Price Mega size</label>
              <input
                type="number"
                name="priceMega"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.priceMega}
              />
              <p className='text-danger px-4 py-2'>{errors.priceMega && touched.priceMega && errors.priceMega}</p>
              <label>Price Giga size</label>
              <input
                type="number"
                name="priceGiga"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.priceGiga}
              />
              <p className='text-danger px-4 py-2'>{errors.priceGiga && touched.priceGiga && errors.priceGiga}</p>
              <label>Price Peta size</label>
              <input
                type="number"
                name="pricePeta"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pricePeta}
              />
              <p className='text-danger px-4 py-2'>{errors.pricePeta && touched.pricePeta && errors.pricePeta}</p>
              <label>Price Tera size</label>
              <input
                type="number"
                name="priceTera"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.priceTera}
              />
              <p className='text-danger px-4 py-2'>{errors.priceTera && touched.priceTera && errors.priceTera}</p>
                <input type='file' onChange={onFileSelect} className='form-control' />
                <div className='mt-4'>
                  <button type="submit" className='btn btn-success px-5' disabled={isSubmitting}>
                    Update food
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  )
}

export default ListFood