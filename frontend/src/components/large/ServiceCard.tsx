'use client'
interface CardProps {
    icon: React.ReactNode;
    title: string;
}

export default function ServiceCard({ icon, title }: CardProps) {

    //TODO FUNCTION IF CLICKED

    return (
        <>
            <div
                className='
                    w-48 h-32 border-2 border-gray-300 rounded-2xl flex flex-col justify-center items-center 
                    hover:scale-105 hover:border-gray-500 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 
                    transition-all duration-300 ease-in-out flex-shrink-0
                '
                tabIndex={0} // makes the div focusable
            >
                <i>{icon}</i>
                <p className='font-bold'>{title}</p>
            </div>
        </>
    );
}
