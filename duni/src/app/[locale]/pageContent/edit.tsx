'use client'

import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import TimeInput from '../component/TimeInput'
import { useRouter } from 'next/navigation'
import Image from "next/image";

const Page = (
    {
        interestText = '',
        titleText = '',
        durationText = '',
        timeText = '',
        saveText = '',
        delText = '',
        fb1 = '',
        fb2 = '',
        fb3 = '',
        sureText = '',
        cancelText = '',
        confirmText = '',
        logline = '',
        l1 = '',
        l2 = '',
        l3 = '',
        l4 = '',
        lang = '',
    }) => {
    const router = useRouter()

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);
    const numTimeInput = [1, 2, 3, 4, 5, 6, 7, 8]

    const [allData, setAllData] = useState<obj[]>([]);
    const [nowEdit, setNowEdit] = useState(0);
    const [feedback, setFeedback] = useState('');

    interface obj {
        title: string;
        duration: number;
        showTime: string[];
        isShow: boolean;
    }

    // get data from localStorage
    useEffect(() => {

        console.log('use effect working')
        let allD = localStorage.getItem('allData')
        allD ? setAllData(JSON.parse(allD)) : null

        let nowE = localStorage.getItem('nowEdit')
        if (nowE && allD) {
            setNowEdit(parseInt(nowE))
            parseInt(nowE) != allD?.length ? setOldData(parseInt(nowE), JSON.parse(allD)) : null
        }
    }, [])

    const setOldData = (index: number, allD: obj[]) => {
        if (allD[index]) {
            const titleInp = document.querySelector('#inputTitle');
            (titleInp as HTMLInputElement).value = allD[index].title;
            setTitle(allD[index].title)

            const durInp = document.querySelector('#inputDuration');
            (durInp as HTMLInputElement).value = String(allD[index].duration);
            setDuration(allD[index].duration)

            let allTime: string[] = []
            const btnTime = document.querySelectorAll('.timeInp')
            for (let i = 0; i < allD[index].showTime.length; i++) {
                (btnTime[i] as HTMLInputElement).value = allD[index].showTime[i];
                (btnTime[i] as HTMLInputElement).className += ' border border-light text-light'
                allTime.push(allD[index].showTime[i])
            }
        }
    }

    const validateEdit = () => {
        //เก็บเวลา
        let allTime: string[] = []
        const btnTime = document.querySelectorAll('.timeInp')
        btnTime.forEach(btn => {
            let val = (btn as HTMLInputElement).value
            val ? allTime.push(val) : null
        });

        // เก็บชื่อคนอื่นไว้เชคชื่อซ้ำ
        let other = [...allData]
        if (nowEdit != allData.length) {
            other.splice(nowEdit, 1)
        }

        //เชค
        if (!title || !duration || !allTime.length) {
            setFeedback(fb1)
        }
        else if (other.some((data) => data.title === title)) {
            setFeedback(fb2)
        }
        else if (duration > 300) {
            setFeedback(fb3)
        }
        else {
            let uniqueTime = new Set(allTime) //ตัดซ้ำ by set
            allTime = Array.from(uniqueTime) //กลับเป็น list
            allTime.sort()

            let thisData = {
                title: title,
                duration: duration,
                showTime: allTime,
                isShow: true
            }


            //เลขต่อท้าย = เพ่ิ่ม
            if (nowEdit == allData.length) {
                // console.log('add new mov')
                let newData = [...allData, thisData]
                localStorage.setItem('allData', JSON.stringify(newData))
                router.push('/')
            }
            else {
                // update เรื่องที่ nowEdit

                let newData = [...allData]
                newData[nowEdit] = thisData
                localStorage.setItem('allData', JSON.stringify(newData))
                router.push(`/${lang}`)
            }
        }
    }

    // delete this
    const [sureDel, setSureDel] = useState(false);
    const deleteThis = () => {
        if (nowEdit != allData.length) {
            let newData = [...allData]
            newData.splice(nowEdit, 1)
            localStorage.setItem('allData', JSON.stringify(newData))
        }
        router.push('/')
    }

    return (
        <div className='px-4 text-white'>

            {sureDel ? <div className='fixed z-20 bg-[#0005] w-full h-full top-0 left-0 flex'>
                <div className='text-center bg-btn rounded-lg m-auto w-[350px]'>
                    <div className='py-6'>
                        <div className='flex justify-center items-center'><Image src={'/trash.svg'} alt="edit icon" width={80} height={80} /></div>
                        {sureText}
                    </div>
                    <div className='grid grid-cols-2 bg-back py-4 text-sm'>
                        <div className="cursor-pointer text-fade" onClick={() => { setSureDel(false) }}>{cancelText}</div>
                        <div className="cursor-pointer font-semibold" onClick={deleteThis}>{confirmText}</div>
                    </div>
                </div>
            </div> : null}

            <Nav
                logline={logline}
                l1={l1}
                l2={l2}
                l3={l3}
                l4={l4}
                lang={lang}
            />

            <div className='mt-20'>
                <div className='flex flex-col gap-3'>
                    <div className='font-semibold'>{interestText}</div>
                    <input id='inputTitle' maxLength={20} className='p-2.5 bg-btn rounded-md focus:border focus:border-light focus:outline-none' type="text" placeholder={titleText}
                        onChange={(e) => { setTitle(e.target.value) }} />
                    <input id='inputDuration' className='p-2.5 bg-btn rounded-md focus:border focus:border-light focus:outline-none' type="number" placeholder={durationText}
                        onChange={(e) => { setDuration(parseInt(e.target.value)) }} />

                    <div className='font-semibold'>{timeText}</div>
                    <div className='grid grid-cols-4 gap-3 text-sm'>
                        {numTimeInput.map((number, index) => (
                            <div key={index}>
                                <TimeInput />
                            </div>
                        ))}
                    </div>
                    {feedback ?
                        <div className='text-red-400 text-sm'>{feedback}</div> : null
                    }

                    <div className="text-center fixed w-full max-w-screen-sm bottom-0 mb-8 pr-6">
                        <div className='cursor-pointer rounded-md p-4 bg-btn text-light font-bold' onClick={validateEdit}>{saveText}</div>
                        <div className='cursor-pointer text-center underline text-sm mt-2 text-fade' onClick={() => { setSureDel(true) }}>{delText}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page