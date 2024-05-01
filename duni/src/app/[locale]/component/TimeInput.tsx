import React, { useState } from 'react'

const TimeInput = () => {
  const [time, setTime] = useState('')

  return (
    <div>
      <input type="time" min="09:00" max="00:00"
        className={`bg-btn p-2.5 rounded-md timeInp focus:outline-none focus:border focus:border-light w-full ${time ? 'border border-light text-light' : 'text-fade'}`}
        onChange={(e) => { setTime(e.target.value) }} />
    </div>
  )
}

export default TimeInput