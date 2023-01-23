import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

function Login(props) {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();

        const userCred = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        const data = await fetch('http://localhost:3000/api/auth/authenticateuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCred)
        })

        const parsedData = await data.json()
        if (parsedData.authToken) {
            localStorage.setItem('token', parsedData.authToken)
            navigate('/')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])
    return (
        <div className='flex flex-col items-center'>
            <div className='bg-gray-900 600 rounded-md pb-3 px-8 pt-5 sm:w-2/4 w-4/5 my-20'>
                <h1 className='text-2xl mb-5 font-bold text-white'>Login</h1>
                <form className='my-3 text-white' onSubmit={handleSubmit}>
                    <label htmlFor="">Email</label>
                    <input type="text" id='email' name='email' className='bg-gray-800 w-full rounded-sm p-2 mb-5' />
                    <label htmlFor="">Password</label>
                    <input type="password" id='password' name='password' className='bg-gray-800 w-full rounded-sm p-2' minLength={5} />
                    <button className='mt-3 bg-fuchsia-600 font-bold px-2 py-1 rounded-sm' type="submit">Login</button>
                </form>
                <Link className='text-white' to='/signup'>Dont Have An Account?</Link>
            </div>
        </div>
    )
}

Login.propTypes = {

}

export default Login

