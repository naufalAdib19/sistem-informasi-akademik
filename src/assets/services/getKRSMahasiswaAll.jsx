import axios from "axios"
import { useState, useEffect } from "react"
import Loading from "../fragments/Loading"

const AllKRS = () => {
    const [data, setData] = useState([])
    const [addKRSState, setAddKRSState] = useState('');
    const [loading, setLoading] = useState(false)
    const token = window.sessionStorage.getItem("token")
    const datas = ''
    const headers = {
        "Aceept" : "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": token
      };

    useEffect(() => {
        axios.get('http://localhost:5000/mahasiswa/view-matkul', {withCredentials: true})
        .then(response => {
            setData(response.data.data)
            setLoading(true)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function addKRS(id){
        axios.post(`http://localhost:5000/mahasiswa/edit-krs/add/${id}`, {} ,{
            headers: headers,
            withCredentials: true
        }).then(response => {
            window.location.href = '/'
        }).catch(err => {
            console.log(err)
            setAddKRSState('Anda telah memilih matkul tersebut / Jam anda bertabrakan')
        })
    }

    return(
        <>
        {loading ?
        <>
            {data != null && data.map((value) => {
                return(
                    <tr>
                        <td className='w-[80px] py-5 lg:w-1/12'>{value.jadwal.hari}</td>
                        <td className='lg:w-2/12'>{value.jadwal.start_class_time} - {value.jadwal.end_class_time}</td>
                        <td className='w-[150px] lg:w-3/12'>{value.nama_matkul}</td>
                        <td className='w-[80px] lg:w-1/12'>{value.kode_kelas}</td>
                        <td className='w[120px] lg:w-1/12'>{value.kode_ruang_kelas != null ? value.kode_ruang_kelas : '-'}</td>
                        <td className='w-[130px] lg:w-1/12'>{value.nip_dosen != null ? value.nip_dosen : '-'}</td>
                        <td className='w-[120px] lg:w-1/12'>{value.filled_bench} / {value.kapasitas}</td>
                        <td className="w-[120px] lg:w-1/12">
                            <form action="">
                                <button className="bg-emerald-500 px-4 py-1 rounded text-white font-bold text-lg shadow-md" onClick={(e) => {e.preventDefault(); addKRS(value.kode_kelas)}}>+</button>
                            </form>
                        </td>
                    </tr> 
                )
            })}
            <tr>
                <td colSpan='8' className="text-red-500 text-center">{addKRSState}</td>
            </tr>
        </>
        : <Loading/>}
        </>
    )
    
}

export default AllKRS;