import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='p-10'>
      <img
        src={assets.nosVemos}
        alt="Nos vemos em breve!"
        className="min-w-[100vw] md:min-w-[60vw] lg:min-w-[40vw]"
      />
    </div>
  );
}

export default Footer