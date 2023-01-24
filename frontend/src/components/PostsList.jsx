import React, { useContext, useEffect } from 'react'
import PropTypes, { element } from 'prop-types'
import Post from './Post'
import postContext from '../context/posts/PostContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function PostsList(props) {
  const navigate = useNavigate()
  const context = useContext(postContext)
  const { posts, getPosts } = context;
  const [games, setGames] = useState()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getPosts()
    }
    else {
      navigate('/login')
    }
  }, [])
  return (
    <div className='flex my-5 w-11/12 p-1 rounded-md'>
      <div className='md:w-2/4'>
        <h1 className="text-white font-bold text-4xl my-2 mx-2">Posts</h1>
        {posts.length === 0 && <h1 className='text-gray-500 text-xl font-light mx-2 my-2'>No Posts To Display</h1>}
        <div className='bg-gray-800 px-2 flex flex-col rounded-sm'>
          {posts && posts.map((post, index) => {
            //
            return <Post image={post[0].image ? post[0].image.imageData : null} key={index} date={post[0].date.slice(0, 10)} likedByUser={(post[1] ? true : false)} author={post[0].author} body={post[0].body} likes={post[0].likes} id={post[0]._id} game={post[0].game.slice(0, 15)} />
          })}
        </div>
      </div>

      <div className='w-2/4 mx-2 md:block hidden'>
        <h1 className="text-white font-bold text-4xl my-2 mx-2">Your Games</h1>
        <div className='bg-gray-800/25 w-full py-5 rounded-sm'>
          <h1 className="text-white px-2 py-4 mx-2 text-4xl font-extralight">Coming Soon!</h1>
        </div>
      </div>


    </div>
  )
}

PostsList.propTypes = {

}

export default PostsList

