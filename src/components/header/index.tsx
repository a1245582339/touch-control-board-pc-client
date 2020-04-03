import React from 'react';
import Button from '@material-ui/core/Button';
import { CloseOutlined, MinimizeSharp } from '@material-ui/icons';
// import { ipcRenderer } from 'electron'
import './index.css'
const { ipcRenderer } = window.require('electron')

const Header: React.FC = (props) => {
    const handleMiniWindow = () => {
        ipcRenderer.send('min')
    }
    const handleCloseWindow = () => {
        ipcRenderer.send('close')
    }
    return (
        <div className='dragable-header'>
            <div className='header-btn-group'>
                <Button style={{ minWidth: 40 }} size="small" onClick={handleMiniWindow}><MinimizeSharp style={{ color: '#fff' }} fontSize="small" /></Button>
                <Button style={{ minWidth: 40 }} size="small" onClick={handleCloseWindow}><CloseOutlined style={{ color: '#fff' }} fontSize="small" /></Button>
            </div>
        </div>
    )
}
export default Header