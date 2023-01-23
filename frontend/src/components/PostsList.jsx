import React, { useContext, useEffect } from 'react'
import PropTypes, { element } from 'prop-types'
import Post from './Post'
import postContext from '../context/posts/PostContext'
import { useNavigate } from 'react-router-dom'

function PostsList(props) {
  const navigate = useNavigate()
  const context = useContext(postContext)
  const { posts, getPosts } = context;

  useEffect(()=> {
    if(localStorage.getItem('token')){
      getPosts()
    }
    else{
      navigate('/login')
    }
  }, [])
  return (
    <div className='flex flex-col my-5 w-11/12 bg-gray-900 p-1 rounded-md'>
        <h1 className="text-white font-bold text-4xl my-2 mx-2">Posts</h1>
        {posts.length === 0 && <h1 className='text-gray-500 text-xl font-light mx-2 my-2'>No Posts To Display</h1>}
        <div className='bg-gray-800 px-2 rounded-sm'>
        {posts.map((post, index) => {
          return <Post key={index} date={post[0].date.slice(0,10)} likedByUser={(post[1]? true: false)} author={post[0].author} body={post[0].body} likes={post[0].likes} id={post[0]._id} game={post[0].game.slice(0,10)} />
        })}
        </div>
        
    </div>
  )
}

PostsList.propTypes = {

}

export default PostsList

