import React, { useState, useEffect, useCallback } from 'react'
import client from '@/socket'
import qrcode from 'qrcode'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import {createSocket} from '@/api/socket'
import getUid from '@/utils/uid'
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
    const getIp = async () => {
        const res = await createSocket(getUid())
        console.log(res)
        // client.onerror = function () {
        //     console.log('Connection Error');
        // };

        // client.onopen = function () {
        //     console.log('connect')
        // };

        // client.onclose = function () {
        //     console.log('echo-protocol Client Closed');
        // };

        // client.onmessage = function (e) {
        //     const ips: Ips[] = JSON.parse(e.data as string)
        //     setIps(ips)
        //     const selectedIp = ips.find(item => /WLAN|en0/.test(item.name)) || ips[0]
        //     setWsUrl(selectedIp.ws)
        // };
    }
    return (
        <div>
            <FormControl>
                <InputLabel id="select-label">选择无线网卡</InputLabel>
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