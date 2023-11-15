import React, { useState,useEffect }from 'react';
import './header.css';
import { NavLink, Navigate } from 'react-router-dom';
import { scrolltoAbout,scrolltoProcess } from '../../modules/scrollUtilts';
import { Modal } from '../modal/modal';
import { supabase } from "../../supabaseClient"
const navMenu = [
  {
    name:'Главная',
    src:'/'
  },
  {
    name:'',
    src:'/profile'
  }
]


export const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [user, setUser] = useState()
    const [isLoading , setIsLoading] = useState(true)
    const openModal = () => {

      if(user){
        return window.location.href = `${window.location.origin}/profile`;
      }
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const about = () =>{
      scrolltoAbout()
    }
    const process = () =>{
      scrolltoProcess()
    }

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1024);
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(()=>{
        (async ()=>{
          const { data } = await supabase.auth.getUser()
          setIsLoading(false)
          setUser(data.user)
          console.log(data);
        })()
    }, [])

    return(
    <header className='header'>
        <div className='menu'>
          <img className='logo' src={isSmallScreen ? '/mini-logo.png' : '/logo.png'} alt='Логотип'></img>
          <div className='nav-menu'>
            <div className='nav-item'>
              <button>
                <NavLink to={navMenu[0].src}>
                  {navMenu[0].name}
                </NavLink>
              </button>
            </div>
            <div className='nav-item'>
              <button onClick={about}>
                <NavLink to={navMenu.src}>
                  О компании
                </NavLink>
              </button>
            </div>
            <div className='nav-item'>
              <button onClick={process}>                
                <NavLink to={navMenu.src}>
                  Процесс работы
                </NavLink>
              </button>
            </div>
          </div>
          <p className='name-user'>{!isLoading && user ? user.email : ''}</p>
          <button className='log-in' onClick={openModal}>
            <img src='/logIn.png'></img>
          </button>
          {isModalOpen && <Modal closeModal={closeModal} isModalOpen={isModalOpen}/>}
        </div>
    </header>
    )
}


