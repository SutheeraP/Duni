import Link from 'next/link'
import React, { useState } from 'react'

const Nav = () => {
    const [showInfo, setShowinfo] = useState(false)

    return (
        <div className='fixed top-0 left-0 z-10 w-full'>
            <div className='grid grid-cols-3 p-3 relative z-10 bg-white max-w-screen-sm mx-auto'>
                <div className='w-full'></div>
                <div className='w-full'>
                    <Link href='/'>
                        <div className='text-center font-bold'>DUNI</div>
                    </Link>
                </div>
                <div className='w-full flex justify-end' onClick={() => { setShowinfo(!showInfo) }}>?</div>
            </div>
            
            <hr />

            {showInfo ?
                <div className='absolute top-0 w-full h-dvh z-0 bg-white flex'>
                    <div className='m-auto max-w-screen-sm px-4 flex flex-col gap-8'>
                        <div className='text-center'>
                            <div className='font-bold text-xl'>DUNI</div>
                            <div className='text-sm'>ในหนึ่งวันจะดูได้กี่เรื่อง ดูนี่</div>
                        </div>

                        <ol className="list-decimal pl-4 text-sm">
                            <li>กรอกชื่อภาพยนตร์ ความยาว และรอบฉายทั้งหมดที่ท่านสนใจ (ใช้นาฬิกา 24 ชั่วโมง)</li>
                            <li>เมื่อกรอกครบแล้วกดคิดรอบ</li>
                            <li>ระบบจะคำนวณรูปแบบการรับชมทั้งหมด โดยแต่ละรอบจะห่างกันอย่างน้อย 2 ชั่วโมง และไม่ฉายทับกัน (หากมีรูปแบบซ้ำกันแต่คนละเวลา จะเลือกเวลาที่ดีที่สุดให้)</li>
                            <li>ไปดูหนังกันได้เลยจ้า</li>
                        </ol>

                        <div className='text-center'>
                            <div className='border p-2'>FEEDBACK</div>
                            <div className='text-xs mt-3'>©2024 sutheerap</div>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default Nav