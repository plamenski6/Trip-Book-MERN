import React from 'react'
import ReactDom from 'react-dom'

import './index.css'

const SideDrawer = props => {
    const content = <aside className='side-drawer'>{props.children}</aside>
    
    return (
        ReactDom.createPortal(content, document.getElementById('drawer-hook'))    
    )
}

export default SideDrawer
