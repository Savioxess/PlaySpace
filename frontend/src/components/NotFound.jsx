import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function NotFound(props) {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate('/')
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className="mb-10 flex flex-col justify-center items-center rounded-full bg-[url('Background.svg')] md:w-1/5 sm:w-1/5 w-2/4 h-44 bg-fixed bg-repeat-round bg-cover shadow-xl shadow-fuchsia-500/75 border-2 overflow-hidden border-fuchsia-300">
                <h1 className='text-white text-4xl py-16 text-center h-full bg-fuchsia-500/10 w-full'>404</h1>
            </div>
            <h1 className='text-white text-2xl font-bold'>Page Not Found</h1>
            <button onClick={handleGoBack} className='bg-fuchsia-700 active:bg-fuchsia-800 my-3 py-2 px-6 text-white font-bold rounded-md'>Go Back</button>
        </div>
    )
}

NotFound.propTypes = {

}

export default NotFound

