import { useState } from "react";
import PostContext from './PostContext';

const PostState = (props) => {
    let initials = []
    let userPostsInitials = []

    const getPosts = async () => {
        const data = await fetch(`http://localhost:3000/api/posts/fetchallposts`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sort)
        })

        initials = await data.json();
        setPosts(initials.list)
        
    }

    const [posts, setPosts] = useState(initials)
    const [userPosts, setUserPosts] = useState(userPostsInitials)
    const [sort, setSort] = useState({sort: 'likes'})

    const publishPost = async (body) => {
        const data = await fetch('http://localhost:3000/api/posts/publishpost', {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
            body: body,
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
        getUserPosts()
    }

    const getUserPosts = async ()=>{
        const data = await fetch('http://localhost:3000/api/posts/userposts', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })

        const parsedData = await data.json()
        console.log(parsedData);
        setUserPosts(parsedData)
    }

    const deletePost = async (id) => {
        const data = await fetch('http://localhost:3000/api/posts/deletepost', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })

        getUserPosts()
    }
    return (
        <PostContext.Provider value={{ posts, getPosts, publishPost, likePost, userPosts, setSort, getUserPosts, sort, deletePost }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState;