'use client'

import NewMovieBtn from "./component/NewMovieBtn";
import Nav from "./component/Nav";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";



export default function Home() {
  const router = useRouter()
  const [allData, setAllData] = useState<obj[]>([]);

  interface obj {
    title: string;
    duration: number;
    showTime: string[];
    isShow: boolean;
  }

  const handleEdit = (index: number) => {
    localStorage.setItem('nowEdit', index + '')
    router.push('/edit')
  }

  //init
  useEffect(() => {
    console.log('use effect working')

    //init
    let allD = localStorage.getItem('allData')
    if (allD) {
      allD ? setAllData(JSON.parse(allD)) : null // update data
      allD = JSON.parse(allD)
      localStorage.setItem('nowEdit', allD?.length + '')
    }
    else {
      localStorage.setItem('allData', JSON.stringify([]))
      localStorage.setItem('nowEdit', '0')
    }
  }, [])

  // delete all
  const [sureDel, setSureDel] = useState(false);
  const deleteAll = () => {
    localStorage.clear()
    location.reload()
  }

  // show
  const toggleShow = (index: number) => {
    let copyData = [...allData]
    copyData[index].isShow = !copyData[index].isShow
    setAllData(copyData)
  }


  return (
    <div className="min-h-dvh p-3">

      {sureDel ? <div className='absolute z-10 bg-[#0005] w-full h-full flex'>
        <div className='text-center p-3 bg-white m-auto w-[300px]'>
          <div className='py-4'>ลบข้อมูลทั้งหมด?</div>
          <div className='grid grid-cols-2'>
            <div onClick={() => { setSureDel(false) }}>ยกเลิก</div>
            <div onClick={deleteAll}>ยืนยัน</div>
          </div>
        </div>
      </div> : null}

      <Nav />

      <div className="mt-20 flex flex-col gap-4">
        {allData.map((data, index) => (
          <div key={index} className={`border p-2 ${data.isShow ? '' : 'opacity-50'}`}>
            <div className="grid grid-cols-5">
              <div className="col-span-3">
                <div className="font-bold">{data.title}</div>
                <div className="font-light text-sm">{data.duration} นาที</div>
              </div>
              <div className="col-span-2 flex justify-end gap-3">
                <div onClick={() => handleEdit(index)}>edit</div>
                <div onClick={() => toggleShow(index)}>show</div>
              </div>
            </div>

            <div className="grid grid-cols-4 mt-2 text-sm">
              {data.showTime.map((time, index) => (
                <div key={index}>{time}</div>
              ))}
            </div>

          </div>
        ))}


        {allData.length < 8 ?
          <div onClick={() => (handleEdit(allData.length))}>
            <NewMovieBtn />
          </div>
          : null}


        {(allData.filter((data) => data.isShow)).length >= 2 ?
          <div className="text-center">
            <Link href='/result'>
              <div className="border p-3" onClick={() => { localStorage.setItem('allData', JSON.stringify(allData)) }}>คิดรอบ</div>
            </Link>
            <div className="underline text-sm mt-2" onClick={() => { setSureDel(true) }}>ลบทั้งหมด</div>
          </div>
          : null}
      </div>
    </div>
  );
}
