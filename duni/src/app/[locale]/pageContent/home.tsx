'use client'

import NewMovieBtn from "../component/NewMovieBtn";
import Nav from "../component/Nav";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

const Home = (
  {
    minutes = '',
    scheldule = '',
    delall = '',
    lang = '',
    logline = '',
    l1 = '',
    l2 = '',
    l3 = '',
    l4 = '',
    interestText = ''
  }) => {
  //   const t = useTranslations('Index');
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
    router.push(`/${lang}/edit`)
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
    <div className="min-h-dvh bg-back px-4 text-white">

      {sureDel ? <div className='fixed z-20 bg-btn w-full h-full top-0 left-0 flex'>
        <div className='text-center p-3 bg-white m-auto w-[300px]'>
          <div className='py-4'>ลบข้อมูลทั้งหมด?</div>
          <div className='grid grid-cols-2'>
            <div className="cursor-pointer" onClick={() => { setSureDel(false) }}>ยกเลิก</div>
            <div className="cursor-pointer font-bold" onClick={deleteAll}>ยืนยัน</div>
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

      <div className="mt-20 mb-40 flex flex-col gap-6">

        {allData.map((data, index) => (
          <div key={index} className={`drop-shadow-fade bg-back p-4 rounded-md ${data.isShow ? '' : 'opacity-50'}`}>
            <div className="grid grid-cols-5">
              <div className="col-span-3">
                <div className="font-semibold">{data.title}</div>
                <div className="font-light text-sm text-fade">{data.duration} {minutes}</div>
              </div>
              <div className="col-span-2 flex justify-end gap-3">
                <div className="cursor-pointer " onClick={() => handleEdit(index)}>edit</div>
                <div className="cursor-pointer " onClick={() => toggleShow(index)}>show</div>
              </div>
            </div>

            <div className="flex mt-2 text-sm gap-3">
              {data.showTime.map((time, index) => (
                <div key={index} className="border border-fade py-1 px-2 text-center text-fade rounded-md">{time}</div>
              ))}
            </div>

          </div>
        ))}


        {allData.length < 8 ?
          <div onClick={() => (handleEdit(allData.length))}>
            <NewMovieBtn text={interestText} lang={lang}/>
          </div>
          : null}


        {(allData.filter((data) => data.isShow)).length >= 2 ?
          <div className="text-center fixed w-full max-w-screen-sm bottom-0 mb-8 pr-8">
            <Link href={`/${lang}/result`}>
              <div className="cursor-pointer rounded-md p-4 bg-btn text-light font-bold" onClick={() => { localStorage.setItem('allData', JSON.stringify(allData)) }}>{scheldule}</div>
            </Link>
            <div className="cursor-pointer  underline text-sm mt-2 text-fade" onClick={() => { setSureDel(true) }}>{delall}</div>
          </div>
          : null}
      </div>
    </div>
  );
}

export default Home;
