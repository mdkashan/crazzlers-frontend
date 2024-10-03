import { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { User } from '../types/types'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

interface PropsType{
    user: User | null;
}

function Header ({ user }: PropsType){

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleLogout = async()=>{
        try{
            await signOut(auth);
            toast.success("Sign out sucesfully.")
            setIsOpen(false)
        }catch(err) {
            toast.error("Sign out failed")
        }
    }
    
    return (
        <nav className='header'>
            <div className='logo-container'>
            <img src="/logo.jpg" alt="logo"/>
            <h1>Crazzlers</h1>
            </div>

            <div className='link-container'>
            <Link onClick={()=>setIsOpen(false)}to="/">Home</Link>
            <Link onClick={()=>setIsOpen(false)}to="/search"><FaSearch /></Link>
            <Link onClick={()=>setIsOpen(false)}to="/cart"><FaShoppingBag /></Link>

            {
                user?._id?(
                    <>
                    <button onClick={()=> setIsOpen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {
                                user?.role==="admin" && (
                                    <Link onClick={()=>setIsOpen(false)} to={"/admin/dashboard"} style={{color:"white"}}>Admin</Link>
                                )
                            }
                            <Link onClick={()=>setIsOpen(false)} to="/orders" style={{color:"white"}}>Orders</Link>
                            <button onClick={handleLogout} style={{color:"white"}}><FaSignOutAlt /></button>
                        </div>
                    </dialog>
                    </>
                ) : (
                    <Link to="/login"><FaSignInAlt /></Link>
                )
            }
            </div>
           
        </nav>
    )
}

export default Header