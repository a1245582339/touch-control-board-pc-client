interface Ips {
    name: string;
    ip: string;
}
function getIPAdress(): Ips[] {
    var interfaces = require('os').networkInterfaces();
    return Object.keys(interfaces).reduce((total, curr) => {
        const ip = interfaces[curr].find((item: any) => item.family === 'IPv4').address
        return [...total, { name: curr, ip }]
    }, []).filter(item => item.ip !== '127.0.0.1' && !/VMware|Virtual/.test(item.name))
}
export default getIPAdress