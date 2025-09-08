import React, { useState } from 'react'

export default function TestPage() {

    const [count, setCount] = useState(0)


    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[500px] h-[500px] bg-amber-100 text-white flex justify-center items-center gap-[25px]'>
                <button onClick={
                    () => {
                        setCount(count + 1);
                    }
                } className='w-[100px] h-[40px] bg-accent rounded-lg'>+</button>
                <span className='text-accent text-5xl'>
                    {count}
                </span>
                <button onClick={
                    () => {
                        setCount(count - 1);
                    }
                } className='w-[100px] h-[40px] bg-accent rounded-lg'>-</button>
            </div>
        </div>
    )
}
