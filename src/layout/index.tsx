import React, { useEffect } from 'react'
import createSocket from '@/utils/socket'
const Home: React.FC = () => {
    useEffect(() => {
        createSocket()
    }, [])
    const handleClickBtn = () => {
        createSocket()
    }
    return (
        <div>
            <button onClick={handleClickBtn}>123213213</button>
        </div>
    )
}
export default Home