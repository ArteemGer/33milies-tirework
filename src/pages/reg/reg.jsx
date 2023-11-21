import React, { useEffect, useState } from 'react';
import './reg.css';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';

export const Reg = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  async function registerUser() {
    if (name === '' || phoneNumber === '' || email === '' || password === '' || confirmPassword === '') {
      toast.error('Не все поля заполнены'); 
    } else{
      if (!validateEmail(email)) {
        toast.error('Поле почты написано не правильно')
      } else{
        if (password === confirmPassword) {
          const { data, error } = await supabase
          .from ('profile')
          .insert({
            is_admin: false,
            full_name: name,
            email: email,
            phone_number: phoneNumber,
            password:password
          });
        const { dataAuth, errorAuth } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        navigate(-1)
        } else {
          toast.error('Поля пароль и подтверждения пароля не идентичны')
        }
      }
    }
  }
  const handleInputChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setPhoneNumber(e.target.value.slice(0, 11));
    }
  }
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  

  return (
    <div className="app">
      <main className="registration">
        <h1 className='reg-title'>Регистрация</h1>
        <div className="reg-content">
          <div className="reg-inputs">
            <p className='inputs-text'>ФИО</p>
            <input
              className='reg-input'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className='inputs-text'>Телефон</p>
            <input
              className='reg-input'
              type="text"
              value={phoneNumber}
              onChange={handleInputChange}
              maxLength={11}
            />
            <p className='inputs-text'>Адрес электронной почты</p>
            <input
              className='reg-input'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='inputs-text'>Пароль</p>
            <input
              className='reg-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='inputs-text'>Подтверждение пароля</p>
            <input
              className='reg-input'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className='reg-confirm' onClick={() => registerUser()}>Зарегистрироваться</button>
          </div>
          <div className="wheel-img">
            <img src="./wheel.png" alt="" />
          </div>
        </div>
      </main>
    </div>
  );
}