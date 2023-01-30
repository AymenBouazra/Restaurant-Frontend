import { Formik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import foodService from '../../../services/foodServices'
const CreateFood = () => {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState()
  const onFileSelect = ({ currentTarget }) => {
    setPhoto(currentTarget.files[0])
  }
  return (
    <div className="card m-4">
      <div className="card-header">
        <h1 className='text-dark ps-5'>Create Food</h1>
      </div>
      <div className="card-body">
        <Formik
          initialValues={{ foodName: '', description: '', priceMega: '',priceGiga: '',pricePeta: '',priceTera: '' }}
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
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let formData = new FormData();
              Object.keys(values).forEach(fieldName => {
                formData.append(fieldName, values[fieldName]);
              });
              formData.append("photo", photo, photo.name);
              const response = await foodService.createOne(formData)
              navigate('/food')
              toast.success(response.data.message)
              return true
            } catch (error) {
              toast.error(error.response.data.message)
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
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
                  Create
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>


  )
}

export default CreateFood