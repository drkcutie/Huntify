'use client'
import Image from 'next/image';


export const CarIcon = () => (
    <div>
        <Image
            src="/icons/cars_icon.svg" // Corrected path
            alt="Car Icon"
            width={40}
            height={40}
        />
    </div>
);
