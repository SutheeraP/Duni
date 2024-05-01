'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image";

const Nav = (
    {
        logline = '',
        l1 = '',
        l2 = '',
        l3 = '',
        l4 = '',
        lang = '',
    }
) => {
    const [showInfo, setShowinfo] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    const router = useRouter()
    let pathname = usePathname()


    const toggleLang = () => {
        let newPath
        lang == 'en' ? newPath = pathname.replace('en', 'th') : newPath = pathname.replace('th', 'en')
        router.push(newPath)
    }

    const setLang = (newLang: string) => {
        let newPath
        if (newLang != lang) {
            newPath = pathname.replace(lang, newLang)
            router.push(newPath)
        }
    }

    return (
        <div className='fixed top-0 left-0 z-10 w-full bg-back'>
            <div className='grid grid-cols-3 p-4 relative z-10 max-w-screen-sm mx-auto text-white'>
                <div className='cursor-pointer w-full flex justify-start' onClick={() => { setShowinfo(!showInfo); setShowSetting(false) }}>
                    {showInfo ? <Image src={'/infoOn.svg'} alt='info icon' width={25} height={25} /> : <Image src={'/infoOff.svg'} alt='info icon' width={25} height={25} />}
                </div>
                <div className='w-full'>
                    <Link href={`/${lang}`}>
                        <div className='text-center font-bold text-light' onClick={() => { setShowinfo(false); setShowSetting(false) }}>DUNI</div>
                    </Link>
                </div>
                <div className='cursor-pointer w-full flex justify-end' onClick={() => { setShowSetting(!showSetting); setShowinfo(false) }}>
                    {showSetting ? <Image src={'/setOn.svg'} alt='info icon' width={25} height={25} /> : <Image src={'/setOff.svg'} alt='info icon' width={25} height={25} />}
                </div>
            </div>

            {showInfo ?
                <div className='absolute top-0 w-full h-dvh z-0 bg-back flex text-white'>
                    <div className='m-auto max-w-screen-sm px-4 flex flex-col gap-8'>
                        <div className='text-center'>
                            <div className='font-bold text-3xl text-light'>DUNI</div>
                            <div className='text-sm'>{logline}</div>
                        </div>

                        <ol className="list-decimal pl-4 text-sm">
                            <li>{l1}</li>
                            <li>{l2}</li>
                            <li>{l3}</li>
                            <li>{l4}</li>
                        </ol>

                        <div className='text-center'>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc-D42G1XEr1ZXwhuT0U38HRlT0dvpEodyeR0BAK7GbJ8JV-g/viewform" target='_blank'>
                                <div className='cursor-pointer rounded-md p-4 bg-btn text-light font-bold'>FEEDBACK</div>
                            </a>
                            <div className='text-xs mt-3 text-fade font-light'>©2024 sutheerap</div>
                        </div>
                    </div>
                </div>
                : null}

            {showSetting ?
                <div className='absolute top-0 w-full h-dvh z-0 bg-back flex text-white'>
                    <div className='m-auto max-w-screen-sm px-4 flex flex-col gap-8'>

                        <div className='flex gap-4'>
                            <div onClick={() => { setLang('th') }} className={`cursor-pointer rounded-full w-16 h-16 flex justify-center items-center font-bold ${lang == 'th' ? 'border-light bg-light text-back' : 'border border-fade text-fade'}`}>TH</div>
                            <div onClick={() => { setLang('en') }} className={`cursor-pointer rounded-full w-16 h-16 flex justify-center items-center font-bold ${lang == 'en' ? 'border-light bg-light text-back' : 'border border-fade text-fade'}`}>EN</div>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default Nav