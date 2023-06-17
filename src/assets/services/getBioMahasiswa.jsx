import { useState, useEffect, useContext } from "react"
import img from "../img/profilefoto.jpg"
import axios from "axios";
import Loading from "../fragments/Loading";
import { Loaders } from "../helper/Loaders";

const GetBioMahasiswa = () => {
    const [data, setData] = useState();
    const {loadBio, setLoadBio} = useContext(Loaders)
    
    useEffect(() => {
        axios.get('http://localhost:5000/mahasiswa/view-mahasiswa', {
            withCredentials: true
        })
        .then(response => {
            setData(response.data.data)
            setLoadBio(true)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
        {loadBio ?       
        <div>
            <div className='header'>
                <div className='bg-blue-500 h-[130px] rounded-t-md'></div>
                <div className='relative -top-14 px-4 flex'>
                    <div className='px-1 py-1 bg-white w-fit rounded-full'>
                        <img src={img} alt="" className='w-[120px] rounded-full'/>
                    </div>
                    <div className='mt-14 ml-3'>
                        <h1 className='text-lg font-semibold'>{data != null ? data.nama : ''}</h1>
                        <p className='text-sm'>{data != null ? data.nim : ''}</p>
                    </div>
                </div>
            </div>
            <div className='biodata px-4 relative -top-8'>
                <h1 className=' font-bold mb-2'>Bio</h1>
                <hr />
                <table className='mt-2 flex flex-col gap-y-2'>
                    <tr>
                        <td className='font-semibold'>Dosen PA</td>
                        <td>{data != null ? (data.DosenPa != null ? data.DosenPa.Dosen.nama : '-') : ""}</td>
                    </tr>
                    <tr>
                        <td className='font-semibold'>IPK</td>
                        <td>{data != null ? data.ipk: ''}</td>
                    </tr>
                    <tr>
                        <td className='font-semibold'>Tanggal Lahir</td>
                        <td>{data != null ? data.tanggal_lahir.slice(0, 10) : ''}</td>
                    </tr>
                    <tr>
                        <td className='font-semibold'>Gender</td>
                        <td>{data != null ? data.gender : ''}</td>
                    </tr>
                    <tr>
                        <td className='font-semibold'>Nomer HP</td>
                        <td>{data != null ? data.no_hp: ''}</td>
                    </tr> 
                </table>
            </div>
        </div> : <Loading/>}
        </>
    )
}

export default GetBioMahasiswa