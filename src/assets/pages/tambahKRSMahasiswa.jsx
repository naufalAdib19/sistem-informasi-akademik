import NavBar from "../fragments/NavBar"
import SideBar from "../fragments/SideBar"
import AllKRS from "../services/getKRSMahasiswaAll"

const TambahKRS = () => {

    if(window.sessionStorage.getItem('login') !== '200'){
        window.location.href = '/login'
    }

    return(
        <div className="">
            <div className="navbar bg-white py-3 px-3 md:px-5 flex justify-between items-center fixed w-screen z-[100]">
                <NavBar title="KRS"/>
            </div>
            <div className="sideNav h-screen bg-white w-[85px] fixed flex flex-col items-center tranform translate-x-[-85px] md:translate-x-[0px] md:mt-[70px]">
                <SideBar bg2='bg-blue-100' text2='text-blue-600'/>  
            </div>
            <div className='content md:ml-[85px] px-2 lg:px-5 py-24 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4'>
                <div className='jadwal-mahasiswa md:col-span-2 bg-white px-4 py-3 drop-shadow-md rounded '>
                    <div className="header flex justify-between items-center mt-5">
                        <h1 className='font-bold'>KRS WAR</h1>
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
                                        <th className='font-normal w-[130px] lg:w-1/12'>Ruang Kelas</th>
                                        <th className='font-normal w-[130px] lg:w-1/12'>Dosen</th>
                                        <th className='font-normal w-[80px] lg:w-1/12'>Kuota</th>
                                        <th className='font-normal w-[80px] lg:w-1/12'></th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    <AllKRS/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TambahKRS