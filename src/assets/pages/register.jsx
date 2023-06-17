import { FaBook } from "react-icons/fa";
import login2 from "../img/login2.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
    const [NIM, setNIM] = useState('');
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [confirmState, setConfirmState] = useState('')
    const [style, setStyle] = useState(false)
    const [token, setToken] = useState("");
    const [register, setRegister] = useState('')
    const headers = {
        "Aceept" : "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": token,
      };

    useEffect(() => {
    axios.get('http://localhost:5000/mahasiswa/token' , {
        withCredentials: true
    })
    .then(response => {
        setToken(response.data.csrfToken)
    })
    .catch(err => console.log(err))
    }, []);
    

    useEffect(() => {
        if(confirm === password && confirm !== ''){
            setConfirmState('Password anda sudah sesuai')
            setStyle(true)
        } else if (confirm !== '' && confirm !== password) {
            setConfirmState('Password and tidak sesuai!')
            setStyle(false)
        } else if(confirm === '' ) {
            setConfirmState('')
        }
    }, [confirm])

    function signUpHandler(){
        if(style === true){
            axios.post("http://localhost:5000/mahasiswa/signup",
            {
                nim: NIM,
                password: password
            },
            {
                headers: headers,
                withCredentials: true
            }
            ).then(response => {
                console.log(response)
                window.location.href = '/login'
            }).catch(err => {
                console.log(err.response.data.message)
                setRegister(err.response.data.message)
            })
        }
    }

    return(
        <div className="h-screen flex items-center justify-center bg-slate-100">
        <div className="content-wrapper flex flex-col-reverse  md:flex-row drop-shadow-lg">
          <div className="input-user w-[600px] bg-white py-12 px-20 md:px-12 rounded-l-md">
            <div className="icon flex items-center gap-x-3">
              <FaBook className="text-3xl text-blue-500" />{" "}
              <h1 className="font-semibold text-2xl">Pembasdat</h1>
            </div>
            <h1 className="font-bold text-4xl mt-12 mb-1">Register.</h1>
            <p className="text-neutral-300 font-normal">
              Please register first if you don't have an account
            </p>
            <form
              className="mt-10 flex flex-col gap-y-1"
              onSubmit={(e) => {
                e.preventDefault();
                signUpHandler();
              }}
            >
              <label htmlFor="">Enter your NIM</label>
              <input
                type="text"
                className="border border-neutral-300 rounded w-5/6 mt-2 px-2 py-2 mb-4"
                onChange={(e) => setNIM(e.target.value)}
                placeholder="NIM"
              />
  
              <label htmlFor="">Enter your password</label>
              <input
                type="password"
                className="border border-neutral-300 rounded w-5/6 mt-2 px-2 py-2 mb-4"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
              />

              <label htmlFor="">Confirm your password</label>
              <input
                type="password"
                className="border border-neutral-300 rounded w-5/6 mt-2 px-2 py-2"
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="*****"
              />
              <p className={style ? 'text-green-600' : 'text-red-500'}>{confirmState}</p>
              <button
                type="submit"
                className="bg-blue-500 w-5/6 mt-10 py-2 text-white font-semibold rounded-md"
              >
                Sign Up
              </button>
              <p className="text-red-500">{register}</p>
            </form>
            <p className="text-center mt-7">Already have account? <a href="/login" className="text-blue-500 font-semibold">Sign In</a></p>
          </div>
          <div className="animation rounded-r bg-[#d7e9ff] w-[600px] flex items-center">
            <img
              src={login2}
              className="w-[500px] md:w-[cover] outline-none border-none rounded-r relative"
            />
          </div>
        </div>
      </div>
    )
}

export default Register