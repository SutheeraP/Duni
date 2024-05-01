'use client'

import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Link from 'next/link';

const Page = (
    {
        movies='',
        results='',
        edit='',
        logline = '',
        l1 = '',
        l2 = '',
        l3 = '',
        l4 = '',
        lang='',
    }
) => {
    const [allData, setAllData] = useState<any[]>([]);
    const [option, setOption] = useState<number[]>([]);
    const [selectLen, setSelectLen] = useState(2);

    interface obj {
        title: string;
        duration: number;
        showTime: string[];
        isShow: boolean;
    }

    interface res {
        title: string;
        showTime: string;
    }

    // scheduel = []

    useEffect(() => {
        console.log('use effect working')
        let allD = localStorage.getItem('allData')
        if (allD) {
            let raw = JSON.parse(allD)
            let filter = raw.filter((data: obj) => data.isShow)
            startCal(filter)
        }
        // allD ? setAllData(JSON.parse(allD)) : null
        // allD ? setAllData(JSON.parse(allD)) : null
    }, [])

    function findMovieSchedules(movies: obj[]) {
        // Stores all possible movie schedules
        const schedules: any[] = [];
        const allWay: any[] = [];

        //หาผล N!
        function allSolution(remainingMovies: obj[], currentWay: obj[]) {
            if (remainingMovies.length === 0) {
                allWay.push([...currentWay]); // Copy current schedule
                return;
            }
            for (const movie of remainingMovies) {
                const newWay = [...currentWay, movie];
                allSolution([...remainingMovies.filter((m) => m !== movie)], newWay);
            }
        }

        function backtrack(remainingMovies: obj[], currentSchedule: res[], startTime: number) {
            // กำหนด min เรื่องที่อยากดู = if ( remainingMovies.length === 0 || (!remainingMovies.some((movie) => movie.showtime.some((showtime) => isValidTime(showtime, startTime))) && currentSchedule.length >= 2))
            // ใส่ครบแล้ว || showtime ไม่เหลือให้ใส่ && ยาวกว่า 2 
            if (
                remainingMovies.length === 0 ||
                !remainingMovies.some((movie) =>
                    movie.showTime.some((showtime) => isValidTime(showtime, startTime))
                ) && currentSchedule.length > 1
            ) {
                schedules.push([...currentSchedule]); // Copy current schedule
                return;
            }

            const nextMovie = remainingMovies[0];
            const validShowtimes = nextMovie.showTime.filter((showtime) =>
                isValidTime(showtime, startTime)
            );
            if (validShowtimes[0]) {
                const showtime = validShowtimes[0];
                const newSchedule = [
                    ...currentSchedule,
                    { title: nextMovie.title, showTime: showtime },
                ]; // Copy and add movie to schedule
                const nextStartTime =
                    convertMinutes(showtime) +
                    (nextMovie.duration < 120 ? 120 : nextMovie.duration);
                backtrack(
                    [...remainingMovies.filter((m) => m !== nextMovie)],
                    newSchedule,
                    nextStartTime
                );
            }
        }

        function isValidTime(showtime: string, prevEndTime: number) {
            const showtimeMinutes = convertMinutes(showtime);
            // Assuming latest screening ends before midnight (1440 minutes in a day)
            // prevEnd = เวลาจบเรื่องที่แล้ว
            // console.log(showtime , prevEndTime, movieDuration)
            return prevEndTime <= showtimeMinutes;
        }

        function convertMinutes(timeString: string) {
            const [hours, minutes] = timeString.split(":").map(Number);
            return hours * 60 + minutes;
        }

        // Start backtracking with all movies and initial start time
        //   backtrack(movies.slice(), [], 0);
        allSolution(movies.slice(), []);
        allWay.forEach((way) => {
            backtrack(way.slice(), [], 0);
            // console.log(way);
        });

        //จบ fuction schedules
        return schedules;
    }

    const startCal = (movies: obj[]) => {
        const schedules = findMovieSchedules(movies);

        if (schedules.length) {
            // list > json > set > list
            const stringifiedArrays = schedules.map(arr => JSON.stringify(arr));
            const uniqueSet = new Set(stringifiedArrays);
            const uniqueSchedule = Array.from(uniqueSet).map(str => JSON.parse(str));

            // console.log(uniqueSchedule.length + " Possible movie uniqueSchedule:");
            uniqueSchedule.sort();
            uniqueSchedule.reverse();
            setAllData(uniqueSchedule)

            // สร้าง option ด้านบน
            let opt: number[] = []
            uniqueSchedule.forEach((sequence) => {
                opt.push(sequence.length)
            });
            let unique = new Set(opt)
            opt = Array.from(unique)
            setOption(opt)
            setSelectLen(opt[0])

            // log
            // uniqueSchedule.forEach((schedule) => {
            //     console.log(
            //         "  - ",
            //         schedule.map((movie: obj) => `${movie.title} (${movie.showTime})`).join(", ")
            //     );
            // });
        } else {
            console.log("No possible");
        }
    }

    return (
        <div className='px-4'>
            <Nav
            logline={logline}
            l1={l1}
            l2={l2}
            l3={l3}
            l4={l4}
            lang={lang}
            />

            <div className='mt-20'>
                <div className='flex text-center gap-3 justify-center my-3'>
                    {option.map((opt) => (
                        <div key={opt} className={`cursor-pointer border border-light rounded-full w-8 h-8 flex justify-center items-center ${opt == selectLen ? 'bg-light text-back' : 'text-light'}`} onClick={() => { setSelectLen(opt) }}>{opt}</div>
                    ))}
                    {option.length ? <div className='flex items-center text-light'>{movies}</div> : null}

                </div>

                <div className='text-center text-sm text-fade'>
                    {(allData.filter((sequence) => sequence.length == selectLen)).length} {results}
                </div>


                <div className='flex flex-col gap-6 py-6'>
                    {(allData.filter((sequence) => sequence.length == selectLen)).map((sequence, index) => (
                        <div key={index} className='drop-shadow-fade bg-back p-4 rounded-md'>
                            {sequence.map((data: res, index: number) => (
                                <div key={index} className='grid grid-cols-5 gap-4 text-white'>
                                    <div className='col-span-1'>{data.showTime}</div>
                                    <div className='col-span-4'>{data.title}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className='py-16'></div>

                <div className="text-center fixed w-full max-w-screen-sm bottom-0 mb-8 pr-8">
                    <Link href={`/${lang}`}>
                        <div className='cursor-pointer rounded-md p-4 bg-btn text-light font-bold'>{edit}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page