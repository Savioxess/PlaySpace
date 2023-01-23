import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Navbar(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState({ id: "", name: "", email: "" })
  const getData = async () => {
    const data = await fetch('http://localhost:3000/api/auth/getuser', {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })

    const parsedData = await data.json();
    console.log(parsedData);

    setUser({
      id: parsedData.user._id,
      name: parsedData.user.name,
      email: parsedData.user.email,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate(0)
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      getData()
      console.log("hello");
    }

  }, [localStorage.getItem('token')])
  return (
    <nav className='flex items-center justify-between p-2'>
      <div className='flex'>
        <Link to='/' className='sm:text-xl md:text-3xl text-white'>PlaySpace</Link>
      </div>
      {localStorage.getItem('token') ? <div className='flex items-center'><Link to='/user' className='text-white text-sm font-light'>{user.name.toUpperCase()}</Link><button onClick={handleLogout} title='Log out' className='text-white mx-2'><i className="fa-solid fa-right-from-bracket"></i></button></div> : <div className='flex'>
        <Link to='/login' className='bg-white shadow-lg font-bold py-1 px-3 rounded-md'>Login</Link>
        <Link to='/signup' className='sm:block hidden shadow-lg text-white bg-fuchsia-700 ml-2 font-bold py-1 px-3 rounded-md'>Signup</Link>
      </div>}
    </nav>
  )
}

Navbar.propTypes = {

}

export default Navbar;

