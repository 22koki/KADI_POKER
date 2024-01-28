import React from 'react'

function navCenter() {
  return (
    <div className='navCenter-crd'>
        <div className='left-navBar'>
        <a href=''>Timer : {minutes}m {seconds}s</a>
        </div>

        <div className='right-navBar'>
        <h2>Running Score :</h2>
            
        </div>
    </div>
  )
}

export default navCenter