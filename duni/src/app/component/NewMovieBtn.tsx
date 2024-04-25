import Link from 'next/link'
import React from 'react'

const NewMovieBtn = () => {
    return (
        <div>
            <Link href='/edit'>
                <div className='border p-3 text-center'>
                    + เรื่องที่สนใจ
                </div>
            </Link>
        </div>
    )
}

export default NewMovieBtn