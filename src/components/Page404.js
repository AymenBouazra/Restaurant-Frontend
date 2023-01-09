import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    const [search,setSearch] = useState('')
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
    }
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center flex-column'><h1>404 page not found!</h1>
    <div className='d-flex w-100 justify-content-center mt-5' ><input type='text' className='form-control py-3 w-50 me-4' onChange={handleSearch} placeholder='Search an other page here'/> 
    <Link  className='btn btn-primary py-3 px-5' to={search}>Search</Link> </div>
    </div>
  )
}

export default Page404