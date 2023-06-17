import { FaHome, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = (props) => {
    const {bg1, bg2, text1, text2} = props
    return(
        <>  
        <Link to='/' className={`add-krs py-7 ${bg1} w-full flex justify-center`}>
                <div >
                    <FaHome className={`text-2xl ${text1}`}/>
                </div> 
        </Link>
            <a href='/krs' className={`add-krs py-7 ${bg2} w-full flex justify-center`}>
                <div >
                    <FaPlus className={`text-2xl ${text2}`}/>
                </div>
            </a> 
        </>
    )
}

export default SideBar;