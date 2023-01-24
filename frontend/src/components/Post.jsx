import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import postContext from '../context/posts/PostContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { Buffer } from 'buffer'

function Post(props) {
    const context = useContext(postContext)
    const { likePost } = context
    const [ image, setImage] = useState()

    const handleLike = () => {
        console.log(props.id);
        likePost({'postId': props.id})
    }
    
    useEffect(()=> {
        if(props.image){
            let binary = '';
            let bytes = new Uint8Array(props.image.data.data)
            let len = bytes.byteLength

            for(let i = 0; i < len; i++){
                binary += String.fromCharCode(bytes[i])
            }

            setImage(window.btoa(binary))
            //const base64String = btoa(String.fromCharCode(...new Uint8Array((props.image.data.data))))
            //setImage(base64String)
        }
    }, [props])
    return (
        <div className='bg-gray-900 p-3 my-2 rounded-sm'>
            <div className='flex justify-between'>
                <div className='flex text-white'>
                <h2 className='font-bold text-xl text-white mr-3'>{props.author}</h2>
                <h1 className='bg-fuchsia-700 px-2 rounded-lg'>{props.game}</h1>
                </div>
               
                <div className='flex items-center'>
                    <h1 className='text-white mx-2'>{props.likes}</h1>
                    <button onClick={handleLike} className={`text-2xl ${props.likedByUser ? 'text-fuchsia-500' : 'text-gray-400'}`}><i className="fa-solid fa-star"></i></button>
                </div>

            </div>
            <p className='text-slate-400 my-2'>{props.body}</p>
            
            {props.image && <div className='w-full bg-black flex justify-center max-h-96 overflow-hidden'>
                <img className='' src={`data:image/jpg;base64,${image}`} alt="" />
            </div>}
            <h1 className='text-slate-200 mt-6'>Posted On: {props.date}</h1>
        </div>
    )
}

Post.propTypes = {

}

export default Post

