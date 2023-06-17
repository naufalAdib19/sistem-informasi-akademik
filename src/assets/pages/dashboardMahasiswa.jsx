import NavBar from '../fragments/NavBar';
import SideBar from '../fragments/SideBar';
import { FaPrint } from 'react-icons/fa';
import GetBioMahasiswa from '../services/getBioMahasiswa';
import KRSMahasiswa from '../services/getKRSMahasiswa';
import JadwalMahasiswa from '../services/getJadwalMahasiswa';
import { useGlobalState } from '../services/globalState';
import Loading from '../fragments/Loading';
import { useContext, useEffect } from 'react';
import { Loaders } from '../helper/Loaders';


const Mahasiswa = () => {   

    if(window.sessionStorage.getItem('login') !== '200'){
        window.location.href = '/login'
    } 

    const {loadBio} = useContext(Loaders)

    return(
        <> 
  
        <div className="">
            <div className="navbar bg-white py-3 px-3 md:px-5 flex justify-between items-center fixed w-screen z-[100]">
                <NavBar title="Dashboard"/>
            </div>
            <div className="sideNav h-screen bg-white w-[85px] fixed flex flex-col items-center tranform translate-x-[-85px] md:translate-x-[0px] md:mt-[70px]">
                <SideBar bg1='bg-blue-100' text1='text-blue-600'/>  
            </div>
            <div className={`content md:ml-[85px] px-2 lg:px-5 py-24 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4`}>
                <div className='profile rounded-md bg-white drop-shadow-md'>
                    <GetBioMahasiswa/>
                </div>
                <div className={`krs-mahasiswa rounded-md bg-white md:mt-0 py-2 px-4 lg:px-14 lg:py-5 drop-shadow-md ${loadBio ? '' : 'relative z-[-1]'}`}>
                    <div className='flex justify-between items-center mt-4'>
                        <h1 className='font-bold '>KRS</h1>
                        <div className='flex items-center gap-x-5'>
                            <FaPrint className='text-emerald-500'/>
                            <button className='border border-emerald-500 text-emerald-500 font-semibold px-4 py-[1px] rounded-full'>Semester 4</button>
                        </div>
                    </div>
                    <table className='mt-4'>
                        <thead className='text-slate-300 text-left border-b border-slate-300'>
                            <tr>
                                <th className='font-normal py-3 w-1/6'>Kode</th>
                                <th className='font-normal w-4/6'>Mata Kuliah</th>
                                <th className='font-normal w-1/6'>Batal</th>
                            </tr>   
                        </thead>
                        <tbody className=''>
                            <KRSMahasiswa/>
                        </tbody>
                    </table>
                </div>
                <div className='jadwal-mahasiswa md:col-span-2 bg-white px-4 py-3 drop-shadow-md rounded relative z-[-1]'>
                    <div className="header flex justify-between items-center mt-5">
                        <h1 className='font-bold'>Class</h1>
                        <a href="" className='border border-emerald-500 text-emerald-500 font-semibold px-4 py-[2px] rounded-full text-sm'>+ Tambah Matkul</a>
                    </div>
                    <div className='overflow-x-scroll md:overflow-auto py-4'>
                        <div className='jadwal w-max lg:w-full'>
                            <table className='w-full '>
                                <thead className='text-slate-300 border-b border-slate-300 text-left'>
                                    <tr>
                                        <th className='font-normal py-5 w-[80px] lg:w-1/12'>Hari</th>
                                        <th className='font-normal w-[100px] lg:w-2/12'>Jam</th>
                                        <th className='font-normal w-[150px] lg:w-3/12'>Mata Kuliah</th>
                                        <th className='font-normal w-[80px] lg:w-1/12'>Kelas</th>
                                        <th className='font-normal w-[130px] lg:w-2/12'>Ruang Kelas</th>
                                        <th className='font-normal w-[130px] lg:w-3/12'>Dosen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <JadwalMahasiswa/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </> 
    )
    
}

export default Mahasiswa