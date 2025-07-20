"use client"
import React from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'

const Header = () => {
    const{user} =useKindeBrowserClient();

    return (
        <div>
            <div>

            </div>

            <div className='p-4 shadow-sm border flex justify-end' >
                {user?.picture ? (
                    <Image
                    src={user?.picture}
                    width={35}
                    height={35}
                    alt="user"
                    className="rounded-full"/>
                ) : (
                    <div className="w-[35px] h-[35px] bg-gray-300 rounded-full" />
                )}
            </div>
        </div>
    )
}

export default Header
