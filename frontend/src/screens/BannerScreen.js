import React from 'react'
import hero from '../img/hero.png'

function BannerScreen() {
  return (
    <div
        className='centered'
          style={{
            backgroundImage: `url(${hero})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            width: '100vw',
            height: '49vh'
          }}
        >
    </div>
  )
}

export default BannerScreen
