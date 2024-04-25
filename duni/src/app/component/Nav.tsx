import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <div>
            <Link href='/'>
                <div className='text-center font-bold p-2'>DUNI</div>
            </Link>
            <hr />
        </div>
    )
}

export default Nav