import React, { useEffect, useState } from 'react';
import './reg.css';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const Reg = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  async function registerUser() {
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
  }

  

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
              onChange={(e) => setPhoneNumber(e.target.value)}
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