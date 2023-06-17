import { FaBook } from "react-icons/fa";
import login2 from "../img/login2.jpg";
import axios from "axios";
import { useState, useEffect, useContext} from "react";
import { Loaders } from "../helper/Loaders";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loginState, setLoginState] = useState(null);
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

  function loginHandler(){
    axios.post("http://localhost:5000/mahasiswa/login",
    {
        nim: username,
        password: password
    },
    {
        headers: headers,
        withCredentials: true
    }
    ).then(response => {
        console.log(response)

        if(response.status === 200) {
          window.location.href = '/'
          window.sessionStorage.setItem('login', '200')
          window.sessionStorage.setItem('token', token)
        }

    }).catch(err => {
        setLoginState("Username atau Password anda salah!")
    })
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="content-wrapper flex flex-col-reverse  md:flex-row drop-shadow-lg">
        <div className="input-user w-[530px] bg-white py-12 px-20 md:px-12 rounded-l-md">
          <div className="icon flex items-center gap-x-3">
            <FaBook className="text-3xl text-blue-500" />{" "}
            <h1 className="font-semibold text-2xl">Pembasdat</h1>
          </div>
          <h1 className="font-bold text-4xl mt-12 mb-1">Login.</h1>
          <p className="text-neutral-300 font-normal">
            Log in with your data that you entered <br /> during your
            registration
          </p>
          <form
            className="mt-10 flex flex-col gap-y-1"
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <label htmlFor="">Enter your username</label>
            <input
              type="text"
              className="border border-neutral-300 rounded w-5/6 mt-2 px-2 py-2 mb-4"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />

            <label htmlFor="">Enter your password</label>
            <input
              type="password"
              className="border border-neutral-300 rounded w-5/6 mt-2 px-2 py-2"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"
            />
            
            <button
              type="submit"
              className="bg-blue-500 w-5/6 mt-10 py-2 text-white font-semibold rounded-md"
            >
              Log In
            </button>
            <p className="text-red-500">{loginState != null ? loginState : ""}</p>
          </form>
          <p className="text-center mt-7">Don't have account? <a href="/register" className="text-blue-500 font-semibold">Sign Up</a></p>
        </div>
        <div className="animation rounded-r bg-[#d7e9ff] w-[530px] flex items-center">
          <img
            src={login2}
            className="w-[500px] md:w-[cover] outline-none border-none rounded-r relative"
          />
        </div>
      </div>
    </div>
  );
};


export default Login;
