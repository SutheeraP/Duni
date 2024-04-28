'use client'

import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import TimeInput from '../component/TimeInput'
import { useRouter } from 'next/navigation'

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
                (btnTime[i] as HTMLInputElement).value = allD[index].showTime[i]
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
        else if (duration > 200) {
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
                router.push('/')
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
        <div className='m-3'>

            {sureDel ? <div className='fixed z-20 bg-[#0005] w-full h-full top-0 left-0 flex'>
                <div className='text-center p-3 bg-white m-auto w-[300px]'>
                    <div className='py-4'>{sureText}</div>
                    <div className='grid grid-cols-2'>
                        <div className="cursor-pointer" onClick={() => { setSureDel(false) }}>{cancelText}</div>
                        <div className="cursor-pointer font-bold" onClick={deleteThis}>{confirmText}</div>
                    </div>
                </div>
            </div> : null}

            <Nav
                logline={logline}
                l1={l1}
                l2={l2}
                l3={l3}
                l4={l4}
            />

            <div className='mt-20'>
                <div className='flex flex-col gap-2'>
                    <div className='font-bold'>{interestText}</div>
                    <input id='inputTitle' maxLength={15} className='border p-1' type="text" placeholder={titleText}
                        onChange={(e) => { setTitle(e.target.value) }} />
                    <input id='inputDuration' className='border p-1' type="number" placeholder={durationText}
                        onChange={(e) => { setDuration(parseInt(e.target.value)) }} />

                    <div className='font-bold'>{timeText}</div>
                    <div className='grid grid-cols-4 gap-3 text-sm'>
                        {numTimeInput.map((number, index) => (
                            <div key={index}>
                                <TimeInput />
                            </div>
                        ))}
                    </div>
                    {feedback ?
                        <div className='text-red-600 text-sm'>{feedback}</div> : null
                    }

                    <div className="text-center fixed w-full max-w-screen-sm bottom-0 mb-8 pr-6">

                        <div className='border p-3 text-center bg-white' onClick={validateEdit}>{saveText}</div>
                        <div className='text-center underline text-sm mt-2' onClick={() => { setSureDel(true) }}>{delText}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page