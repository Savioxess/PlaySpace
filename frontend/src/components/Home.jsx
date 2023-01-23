import React from 'react'
import PropTypes from 'prop-types'
import MakePost from './MakePost'
import PostsList from './PostsList'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home(props) {
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
  }, [])
  return (
    <div className='flex flex-col items-center'>
      <div className="bg-[url('Home.jpg')] sm:bg-fixed w-11/12 bg-cover rounded-md sm:h-96 h-44 mt-10 flex justify-center items-center">
        <Link className='bg-fuchsia-600 rounded-lg shadow-xl font-bold text-white p-2'>Add Games <i className="fa-solid fa-gamepad"></i></Link>
      </div>
      <MakePost />
      <PostsList />
    </div>
  )
}

Home.propTypes = {

}

export default Home

