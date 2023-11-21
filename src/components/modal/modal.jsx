import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './modal.css';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Modal = ({closeModal, isModalOpen}) =>{
    const supabaseUrl  = 'https://ppwrvouuxbpzoagefkyu.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwd3J2b3V1eGJwem9hZ2Vma3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyODgyMjMsImV4cCI6MjAxNDg2NDIyM30.0zOn3CODua1yB1wZGfY5ZjDg4RSxevcHr7d5-C1klA8'


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [ user, setUser ] = useState()




    const supabase = createClient(supabaseUrl, supabaseKey);

    const [type,setType] = useState('password')
    const switchType = () =>{
        if(type === 'password'){
            setType('text')
        } else{
            setType('password')
        }
    }
    const handleCloseModal = () => {
        closeModal(); 
    };

    const regButton = 
    {
        name:'У вас нет аккаунта ?',
        src:'/Reg'
    }

    useEffect(() => {
        if(isModalOpen){
            document.body.style.overflow = 'hidden';
        } 
            
        return () => {
            document.body.style.overflow = 'visible';
        }
        
    }, []);


    const submit = async (e) =>{
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })
        if(error == null){
            handleCloseModal()
            window.location.reload()
        } else{
            toast.error('Введенные почта или пароль не верны')
        }
    }

    return(
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Авторизация</h2>
                        <button className='close' onClick={handleCloseModal}>
                            <img className='close-img' src="/cross.png" alt="" />
                        </button>
                    </div>
                    <div className="authorization">
                        <form className='authorization-form' onSubmit={submit}>
                            <div className="input-email">
                                <p className='authorization-text'>Электронная почта</p>
                                <input className='authorization-input' type="text" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="input-password">
                                <p className='authorization-text'>Пароль</p>
                                <input className='authorization-input' type={type} onChange={(e) => setPassword(e.target.value)}/>
                                <button className='show-pass' type='button' onClick={switchType}></button>
                            </div>
                            <button className='sign-in'>Войти</button>
                            <button className='reg' onClick={handleCloseModal}>
                                <NavLink to={regButton.src}>
                                    {regButton.name}
                                </NavLink>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}