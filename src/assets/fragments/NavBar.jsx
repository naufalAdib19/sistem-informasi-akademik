import img from '../img/profilefoto.jpg'
import { FaChevronDown } from "react-icons/fa";
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const NavBar = (props) => {
    const {title} = props
    const [activated, setActivated] = useState('hidden');
    const token = window.sessionStorage.getItem("token")
    const headers = {
        "Aceept" : "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": token
      };
    const [nama, setNama] = useState();
    const [nim, setNim] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/mahasiswa/view-mahasiswa', {
            withCredentials: true
        })
        .then(response => {
            setNama(response.data.data.nama.toLowerCase().replace(/\s/g, ''))
            setNim(response.data.data.nim)
        })
        .catch(err => console.log(err))
    }, [])

    function showDropDown() {
        if(activated == 'hidden') {
            setActivated('block')
        } else {
            setActivated('hidden')
        }
    }

    function logoutHandler() {
        axios.delete('http://localhost:5000/mahasiswa/logout', {
            headers: headers,
            withCredentials: true
        }).then(response => {
            window.location.href = '/login'
            window.sessionStorage.removeItem('login')
            window.sessionStorage.removeItem('token')
        }).catch(err => {
            console.log(err)
        })
        
    }

    return(
            <>
                <div className="hamburger flex flex-col gap-y-1 md:hidden">
                    <div className="bg-black h-[1.5px] w-[25px]"></div>
                    <div className="bg-black h-[1.5px] w-[25px]"></div>
                    <div className="bg-black h-[1.5px] w-[25px]"></div>
                </div>
                <div className='md:flex md:gap-x-24 md:items-center md:block hidden'>
                    <a href="">LOGO's</a>
                    <h1 className='font-semibold text-lg'>{title}</h1>
                </div>
                <div className="profile flex gap-x-5 items-center">
                    <img src={img} alt="" className='w-[45px] rounded-full'/>
                    <div>                      
                        <p className='text-sm text-sky-500 font-semibold'>@{nama}</p>
                        <p className='text-xs text-slate-300'>{nim}</p>
                    </div>
                    <div className='relative'>
                        <div className='icon' onClick={showDropDown}>
                            <FaChevronDown className='text-slate-300 text-sm'/>
                        </div>                   
                        <div className={`absolute right-1 top-11 ${activated}`}>
                            <ul className='text-xs text-left bg-white w-[150px] rounded'>
                                <form action="" onSubmit={(e) => {e.preventDefault(); logoutHandler()}}>
                                    <li className='py-4 border-b border-slate-200 hover:bg-slate-50'>
                                        <button type='submit' className='ml-2' >Logout</button>
                                    </li>
                                    {/* <li className='py-4 hover:bg-slate-50'>
                                        <button className='ml-2'>Edit</button>
                                    </li> */}
                                </form>   
                            </ul>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default NavBar;