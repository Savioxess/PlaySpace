import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react';
import postContext from '../context/posts/PostContext';

function MakePost(props) {
    const context = useContext(postContext)
    const { publishPost } = context
    const handlePost = async (event) => {
        event.preventDefault();
        const userData = await fetch('http://localhost:3000/api/auth/getuser',{
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })

        const parsedUserData = await userData.json()

        const post = {
            author: parsedUserData.user.name,
            body: event.target.body.value,
            game: event.target.game.value
        }
        
        publishPost(post)
    }
    return (
        <div className='flex flex-col items-center mt-5 w-11/12 px-3 rounded-md'>
            <form className='w-full mb-2' onSubmit={handlePost}>
            <h1 className='text-white text-xl font-bold mb-2 mt-2'>Connect With The Community</h1>
                <textarea style={{ "resize": 'none' }} className='rounded-lg w-full text-white p-2 bg-gray-800' name="body" id="body" cols="30" rows="8" placeholder="Post Something"></textarea>
                <div className='flex items-center text-sm'>
                    <button className='bg-fuchsia-600 text-white font-bold ml-1 shadow-xl px-3 text-lg rounded-sm' type="submit">Post</button>
                    <select defaultValue='General' className='bg-gray-700 active:bg-gray-800 focus:outline-none p-1 text-white font-light text-lg mx-2 rounded-sm' name="game" id="game">
                        <option value="General">General</option>
                        <option value="Minecraft">Minecraft</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

MakePost.propTypes = {

}

export default MakePost

