import React from 'react'
import Promofield from './Promofield'
import Coin2 from './Coin2'

function Sidebar({props}) {
    let data = props
    return (
        <div>
            <Promofield/>
            <Coin2 props={data}/>
        </div>
    )
}

export default Sidebar
