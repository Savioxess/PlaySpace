import { useState } from "react";
import PostContext from './PostContext';

const PostState = (props) => {
    let initials = []

    const getPosts = async () => {
        const data = await fetch(`http://localhost:3000/api/posts/fetchallposts`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })

        initials = await data.json();
        setPosts(initials.list)
    }

    const [posts, setPosts] = useState(initials)

    const publishPost = async (body) => {
        const data = await fetch('http://localhost:3000/api/posts/publishpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        })

        getPosts()
    }

    const likePost = async (id) => {
        const data = await fetch('http://localhost:3000/api/posts/likepost', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })

        getPosts()
    }

    return (
        <PostContext.Provider value={{ posts, getPosts, publishPost, likePost }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState;