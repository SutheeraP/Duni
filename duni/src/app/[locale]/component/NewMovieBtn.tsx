import Link from 'next/link'
import React from 'react'

const NewMovieBtn = (
    {
        text='',
        lang='',
    }
) => {
    return (
        <div>
            <Link href={`/${lang}/edit`}>
                <div className='border p-3 text-center'>
                    + {text}
                </div>
            </Link>
        </div>
    )
}

export default NewMovieBtn