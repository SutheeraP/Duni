import React, { useState } from 'react'

const TimeInput = () => {
  const [time, setTime] = useState('')

  return (
    <div>
      <input type="time" min="09:00" max="00:00"
        className={`p-1 timeInp w-full border ${time ? 'border-black' : null}`}
        onChange={(e) => { setTime(e.target.value) }} />
    </div>
  )
}

export default TimeInput