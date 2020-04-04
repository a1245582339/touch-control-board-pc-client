import React, { useState, useEffect, useCallback } from 'react'
import socket from '@/socket'
import qrcode from 'qrcode'
const Home: React.FC = () => {
    const [ip, setIp] = useState('')
    const [qr, setQr] = useState('')
    useEffect(() => {
        getIp()
    }, [])
    const generateQR = useCallback((str: string) => qrcode.toDataURL(str), [])
    useEffect(() => {
        ip && generateQR(ip).then(url => {
            console.log(url)
            setQr(url)
        })
    }, [ip, generateQR])
    const handleClickBtn = () => {
        getIp()
    }
    const getIp = () => {
        socket.on('connect', function () {
            console.log('connect')
            socket.on('message', (msg: string) => {
                setIp(msg)
            })
        });
    }
    return (
        <div>
            ip: {ip}
            <button onClick={handleClickBtn}>123213213</button>
            <img src={qr} alt="" />
        </div>
    )
}
export default Home