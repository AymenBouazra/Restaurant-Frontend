import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListUser = () => {
  const [users, setUsers]= useState([])

  useEffect(()=> {
    const controller = new AbortController();
    const getUsers = async () => {
      const response = await axios.get('http://localhost:4000/users')
      setUsers(response.data) 
    }
    getUsers()
    return controller.abort()
  },[])
  return (
    <div></div>
  )
}

export default ListUser