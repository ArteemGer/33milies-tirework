import './orderPage.css'
import { useState,useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const OrderPage = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const orderId = searchParams.get('id');

    const navigate = useNavigate()
    const [userData, setUserData] = useState()


    useEffect(()=>{
        (async ()=>{
          const { data } = await supabase
          .from('profile')
          .select('*')
        })()
    }, [])

    useEffect(() => {
        const getInfoOrder = async () => {
          const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          setUserData(data)
        };
        getInfoOrder(); 
      }, []);
    return(
        <div className='order'>
            <div className="order-head">
                <button className='back' onClick={() => navigate(-1)}></button>
                <h1>Подробная информация о заказе: {orderId}</h1>
            </div>
            {userData && (
                <div className='block-order-info'>
                    <p className='order-info'>Диаметр колеса: {userData[0].wheelDiameter}</p>
                    <p className='order-info'>№Комлекса: {userData[0].jobNumber}</p>
                    <p className='order-info'>Дата/время: {userData[0].date}  {userData[0].time}</p>
                    <p className='order-info'>Марка и модель авто: {userData[0].autoName}</p>
                    <p className='order-info'>Тип автомобиля: {userData[0].typeCar}</p>
                    <p className='order-info'>Статус: 
                        {userData[0].status === 0 && ' Подтвержден'}
                        {userData[0].status === 2 && ' Отменен'}
                        {userData[0].status === 1 && ' Ожидает подтверждения'}
                        {userData[0].status === 3 && ' Завершен'}
                    </p>
                    <p className='order-info'>Адрес электронной почты: {userData[0].email}</p>
                    <p className='order-info'>ФИО: {userData[0].name}</p>
                    <p className='order-info'>Телефон: {userData[0].phone}</p>
                    {userData[0].ditails && <p>Подробнее: {userData[0].ditails}</p>}
                    <div className="buttons">
                        <button className='confirm-button'>Принять заявку</button>
                        <button className='cancel-button'>Отменить заявку</button>
                    </div>
                </div>
            )}
        </div>
    )
}