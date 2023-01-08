import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className='d-flex w-50 mx-auto flex-column align-items-center mt-4'>
      <h1 className='text-info'>Sign In</h1>
      <Formik
        initialValues={{ userName: '', email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Required';
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
        onSubmit={ async (values, { setSubmitting }) => {
          try {
            axios.post('http://localhost:4000/login', values).then((response)=>{
              window.location.href='/'
              
            }).then(()=>{
              toast.success('Welcome to your dashboard')
              
            })
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
            <button type="submit" className='btn btn-info' disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Login