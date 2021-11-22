import React from 'react'
import Coin2 from './Coin2'
import Promo from './Promo'

function Sidebar({props}) {
    let data = props
    return (
        <div className="sidebar-wrapper">
            <Promo props={data}/>
            <Coin2 props={data}/>
        </div>
    )
}

export default Sidebar
