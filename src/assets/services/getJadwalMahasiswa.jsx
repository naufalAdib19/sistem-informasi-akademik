import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { Loaders } from "../helper/Loaders"

const JadwalMahasiswa = () => {
    const [data, setData] = useState([])
    const {setLoadJadwal} = useContext(Loaders)

    useEffect(() => {
        axios.get('http://localhost:5000/mahasiswa/view-krs', {withCredentials: true})
        .then(response => {
            setData(response.data.data)
            setLoadJadwal(true)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return(
        <>{console.log(data)}
            {
                data != null && data.map((data) => {
                    return(
                        <tr>
                            <td className='w-[80px] py-5 lg:w-1/12'>{data.hari}</td>
                            <td className='lg:w-2/12'>{data.start_class_time} - {data.end_class_time}</td>
                            <td className='w-[150px] lg:w-3/12'>{data.nama_matkul}</td>
                            <td className='w-[80px] lg:w-1/12'>{data.kode_kelas}</td>
                            <td className='w[120px] lg:w-1/12'>{data.kode_ruang_kelas != null ? data.kode_ruang_kelas : '-'}</td>
                            <td className='w-[130px] lg:w-1/12'>{data.nip_dosen != null ? data.nama_dosen : '-'}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default JadwalMahasiswa