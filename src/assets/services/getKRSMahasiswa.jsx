import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { Loaders } from "../helper/Loaders";

const KRSMahasiswa = () => {
    const [data, setData] = useState([]);
    const token = window.sessionStorage.getItem("token")
    const headers = {
        "Aceept" : "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": token
      };
    
    const {setLoadKRS} = useContext(Loaders)

    useEffect(() => {
        axios.get('http://localhost:5000/mahasiswa/view-krs', {withCredentials: true})
        .then(response => {
            setData(response.data.data);
            setLoadKRS(true)
            
        })
        .catch(err => console.log(err))
    }, [])

    function deleteMatkul(id){
        axios.delete(`http://localhost:5000/mahasiswa/edit-krs/delete/${id}`, {
            headers: headers,
            withCredentials: true
        }).then(response => {
            window.location.href = '/'
        }).catch(err => {
            console.log(err)
        })
    }
    
    return(
        <> 
        {
            data != null && data.map((data) => {
                return(
                    <tr>
                        <td className='py-4'>{data.kode_kelas}</td>
                        <td>{data.nama_matkul}</td>
                        <td className=''>
                            <form action="" onSubmit={(e) => {e.preventDefault(); deleteMatkul(data.kode_kelas)} }>
                                <button type="submit" className='bg-emerald-500 text-white px-4 text-2xl shadow-md rounded'>-</button>
                            </form>
                        </td>
                    </tr>
                )
                
            })
        }      
        </>
    )
}

export default KRSMahasiswa