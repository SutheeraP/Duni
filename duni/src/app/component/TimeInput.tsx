import React from 'react'

const TimeInput = () => {
  return (
    <div>
         <input type="time" min="09:00" max="00:00" className='border p-1 timeInp w-full' />
    </div>
  )
}

export default TimeInput