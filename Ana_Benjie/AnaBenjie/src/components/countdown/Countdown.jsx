import React from 'react'
import { assets } from '../../assets/assets';
import CountdownTimer from './CountdownTimer';


const Countdown = () => {
  return (
    <div className="flex flex-col items-center p-12 text-center">
      <h1 className='my-5 text-3xl font-bold'>Quedan</h1>
      <div className='mt-6 max-w-[100vw]'>
        <CountdownTimer />
        <p className='my-6'>para que entre nosotros ya no hayan 6300km</p>
      </div>
      {/* <img src="" alt="" /> */}
    </div>
  );
}

export default Countdown