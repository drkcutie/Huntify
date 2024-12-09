import Link from "next/link";

export default function ServiceCardBar() {
    return (
        <>
            <nav className="bg-green-900 p-10">
                <ul className="flex justify-start space-x-6">
                    <li><Link href='/home' className="text-4xl text-white hover:text-green-400">Seekr | </Link></li>
                    <li><Link href='/cart' className="text-4xl text-white hover:text-gray-400">Service Cart</Link></li>
                </ul>
            </nav>

         
        </>
    );
}
