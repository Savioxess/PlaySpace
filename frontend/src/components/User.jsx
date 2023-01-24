import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import postContext from '../context/posts/PostContext'
import UserPost from './UserPost'

function User(props) {
    const context = useContext(postContext)
    const { userPosts, getUserPosts } = context
    const [user, setUser] = useState({ id: "", name: "", email: "", date: "" })

    const navigate = useNavigate()
    const getUserData = async () => {
        const data = await fetch('http://localhost:3000/api/auth/getuser', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })

        const parsedData = await data.json();

        setUser({
            id: parsedData.user._id,
            name: parsedData.user.name,
            email: parsedData.user.email,
            date: parsedData.user.date.slice(0, 10)
        })
    }

    

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData();
            getUserPosts();
        }
        else{
            navigate('/login')
        }
    }, [])
    return (
        <div className='flex flex-col items-center'>
            <div className='bg-gray-900 p-4 rounded-xl w-4/5 mt-10'>
                <h1 className='text-white text-2xl font-bold'>Your Account</h1>
                <h1 className='text-white mt-5'><span className='text-blue-500 font-bold'>Username:</span> {user.name}</h1>
                <h1 className='text-white mt-5'><span className='text-blue-500 font-bold'>Email:</span> {user.email}</h1>
                <h1 className='text-white mt-5'><span className='text-blue-500 font-bold'>Created On:</span> {user.date}</h1>
            </div>
            <div className='bg-gray-900 p-4 rounded-xl w-4/5 mt-5'>
                <h1 className='text-white text-2xl font-bold'>Your Posts</h1>
                {userPosts.length === 0 && <h1 className='text-gray-500 text-xl font-light mx-2 my-2'>No Posts To Display</h1>}
                {userPosts.list && userPosts.list.map((post, index) => {
                    return <UserPost likedByUser={(post[1] ? true : false)} likes={post[0].likes} body={post[0].body} id={post[0]._id} image={post[0].image? post[0].image.imageData: null} author={post[0].author} game={post[0].game} date={post[0].date.slice(0,10)} />
                })}
            </div>
        </div>
    )
}

User.propTypes = {

}

export default User

