import Image from 'next/image'
import { useState } from 'react'

function NavLink({to, children}) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

function MobileNav({open, setOpen}) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-stone-800 transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-stone-900 h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href="/">
                    <Image 
                        src={'/logo.png'}
                        width='100'
                        height='100'
                    />
                </a>
            </div>
            <div className="flex flex-col ml-4">
                <a className="text-xl font-medium my-4" href="#about" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    About
                </a>
                <a className="text-xl font-normal my-4" href="#contact" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Contact
                </a>
            </div>  
        </div>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    return (
        <nav className="flex filter drop-shadow-md px-10 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-2/12 flex items-center">
                <a className="text-2xl font-semibold" href="/">
                    <Image 
                        src={'/logo.png'}
                        width='100'
                        height='100'
                    />
                </a>
            </div>
            <div className="w-8/12 flex justify-center items-center">
                <div className="hidden md:flex">
                    <NavLink to="#contact">
                        CONTACT
                    </NavLink>
                    <NavLink to="#about">
                        ABOUT
                    </NavLink>
                </div>
            </div>
            <div className="w-2/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>
            </div>
        </nav>
    )
  }
  