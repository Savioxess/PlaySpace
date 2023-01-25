import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react';
import postContext from '../context/posts/PostContext';
import { useState } from 'react';

function MakePost(props) {
    const context = useContext(postContext)
    const [file, setFile] = useState(null)
    const { publishPost } = context

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handlePost = async (event) => {
        event.preventDefault();
        const userData = await fetch('http://localhost:3000/api/auth/getuser', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })

        const parsedUserData = await userData.json()

        const formData = new FormData()

        if (file != null) {
            formData.append('author', parsedUserData.user.name)
            formData.append('body', event.target.body.value)
            formData.append('game', event.target.game.value)
            formData.append('name', 'default')
            formData.append('postImage', file)
        }
        else {
            formData.append('author', parsedUserData.user.name)
            formData.append('body', event.target.body.value)
            formData.append('game', event.target.game.value)
        }

        publishPost(formData)
    }
    return (
        <div className='flex flex-col items-center mt-5 w-11/12 px-3 rounded-md'>
            <form className='w-full mb-2' onSubmit={handlePost}>
                <h1 className='text-white text-xl font-bold mb-2 mt-2'>Connect With The Community</h1>
                <textarea style={{ "resize": 'none' }} className='rounded-lg w-full text-white p-2 bg-gray-800' name="body" id="body" cols="30" rows="8" placeholder="Post Something"></textarea>

                <div className='flex items-center text-sm'>
                    <button className='bg-fuchsia-900 rounded-2xl text-white font-bold ml-1 shadow-xl py-0.5 px-3 text-lg' type="submit">Post</button>
                    <select defaultValue='General' className='bg-gray-700 active:bg-gray-800 focus:outline-none p-1 text-white font-light text-lg mx-2 rounded-2xl' name="game" id="game">
                        <option value="General">General</option>
                        <option value="Minecraft">Minecraft</option>
                        <option value="PUBG Mobile">PUBG Mobile</option>
                    </select>
                    <div className='flex items-center'>
                        <label className='text-white px-1 cursor-pointer rounded-md text-2xl mx-1' htmlFor="postImage"><i class="fa-regular fa-image"></i></label>
                        <input onChange={handleFileChange} className='mx-1 sm:w-3/6 w-3/6 truncate file:hidden cursor-pointer file:border-none file:text-white file:rounded-xl my-2 text-white' title='Only Image Files Accepted' id='postImage' name='postImage' accept='image/*' type='file'></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

MakePost.propTypes = {

}

export default MakePost

