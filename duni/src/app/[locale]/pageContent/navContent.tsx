import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useState } from 'react'

const Nav = (
    {
        logline='',
        l1='',
        l2='',
        l3='',
        l4='',
    }
) => {
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
                <div className='cursor-pointer w-full flex justify-end' onClick={() => { setShowinfo(!showInfo) }}>?</div>
            </div>
            
            <hr />

            {showInfo ?
                <div className='absolute top-0 w-full h-dvh z-0 bg-white flex'>
                    <div className='m-auto max-w-screen-sm px-4 flex flex-col gap-8'>
                        <div className='text-center'>
                            <div className='font-bold text-xl'>DUNI</div>
                            <div className='text-sm'>{logline}</div>
                        </div>

                        <ol className="list-decimal pl-4 text-sm">
                            <li>{l1}</li>
                            <li>{l2}</li>
                            <li>{l3}</li>
                            <li>{l4}</li>
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