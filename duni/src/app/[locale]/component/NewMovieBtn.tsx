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
                <div className='drop-shadow-fade bg-back py-8 rounded-md text-center'>
                    + {text}
                </div>
            </Link>
        </div>
    )
}

export default NewMovieBtn