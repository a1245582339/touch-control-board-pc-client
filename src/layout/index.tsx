import React, { useState, useEffect, useCallback } from 'react'
import socket from '@/socket'
import qrcode from 'qrcode'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
interface Ips {
    name: string;
    ip: string;
    ws: string
}
const Home: React.FC = () => {
    const [ips, setIps] = useState<Ips[]>([])
    const [wsUrl, setWsUrl] = useState('')
    const [qr, setQr] = useState('')
    useEffect(() => {
        getIp()
    }, [])
    const generateQR = useCallback((str: string) => qrcode.toDataURL(str), [])
    useEffect(() => {
        wsUrl && generateQR(wsUrl).then(url => {
            console.log(url)
            setQr(url)
        })
    }, [wsUrl, generateQR])
    const handleChangeIp = (event: React.ChangeEvent<{ value: unknown }>) => {
        setWsUrl(event.target.value as string)
    }
    const getIp = () => {
        socket.on('connect', function () {
            console.log('connect')
            socket.on('message', (msg: Ips[]) => {
                setIps(msg)
                const selectedIp = msg.find(item => /WLAN|en0/.test(item.name)) || msg[0]
                setWsUrl(selectedIp.ws)
            })
        });
    }
    return (
        <div>
            <FormControl>
                <InputLabel id="select-label">Age</InputLabel>
                <Select
                    labelId="select-label"
                    id="ip-select"
                    value={wsUrl}
                    onChange={handleChangeIp}
                >
                    {
                        ips.map(item =>
                            <MenuItem value={item.ws} key={item.ip}>{item.name}: {item.ip}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <img src={qr} alt="" />
        </div>
    )
}
export default Home