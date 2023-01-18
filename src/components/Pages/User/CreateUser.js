import { Formik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from '../../../services/userServices'
const CreateUser = () => {
  const navigate = useNavigate()
  const [photo,setPhoto] = useState()
  const onFileSelect = ({currentTarget}) => {
    setPhoto(currentTarget.files[0])
    
  }
  return (
    <div className="card m-4">
      <div className="card-header">
        <h1 className='text-dark ps-5'>Create User</h1>
      </div>
      <div className="card-body">
        <Formik
          initialValues={{ userName: '', email: '', password: '', role: '' }}
          validate={values => {
            const errors = {};
            if (!values.userName) {
              errors.userName = 'Required';
            }
            if (!values.password) {
              errors.password = 'Required';
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
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let formData = new FormData();
              Object.keys(values).forEach(fieldName => {
                formData.append(fieldName, values[fieldName]);
              });
              formData.append("photo", photo, photo.name);
              const response = await userService.createOne(formData)
              navigate('/users')
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

export default CreateUser