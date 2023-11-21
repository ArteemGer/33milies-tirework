import './orderPage.css'
import { useState,useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const OrderPage = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const orderId = searchParams.get('id');

    const navigate = useNavigate()
    const [orderData, setOrderData] = useState()
    const [isLoading , setIsLoading] = useState(true)
    const [userData, setUserData] = useState()


    useEffect(()=>{
        (async ()=>{
            const { data: { user } } = await supabase.auth.getUser()
            console.log(user.email);
            const { data: data2, error } = await supabase
                .from('profile')
                .select()
                .eq('email', user.email);
            setUserData(data2[0]);
            setIsLoading(false)
        })()
    }, [])

    useEffect(() => {
        const getInfoOrder = async () => {
          const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          setOrderData(data)
        };
        getInfoOrder(); 
      }, []);

      const handleCancel = async() => {
        const { data, error } = await supabase
        .from('orders')
        .update({ status: 2})
        .eq('id', orderId);
        toast.success('Вы успешно сменили статус заявки')
        setTimeout(() => {
            window.location.reload();
          }, 3000);
      };

      const handleConfirm = async() => {
        const { data, error } = await supabase
        .from('orders')
        .update({ status: 0})
        .eq('id', orderId);
        toast.success('Вы успешно сменили статус заявки')
        setTimeout(() => {
            window.location.reload();
          }, 3000);
      };
      const handleReady = async() => {
        const { data, error } = await supabase
        .from('orders')
        .update({ status: 3})
        .eq('id', orderId);
        toast.success('Вы успешно сменили статус заявки')
        setTimeout(() => {
            window.location.reload();
          }, 3000);
      };

    return(
        <div className='order'>
            <div className="order-head">
                <button className='back' onClick={() => navigate(-1)}></button>
                <h1>Подробная информация о заказе: {orderId}</h1>
            </div>
            {!isLoading && userData && orderData && orderData[0] && (
                <div className='block-order-info'>
                    <p className='order-info'>Диаметр колеса: {orderData[0].wheelDiameter}</p>
                    <p className='order-info'>№Комлекса: {orderData[0].jobNumber}</p>
                    <p className='order-info'>Дата/время: {orderData[0].date}  {orderData[0].time}</p>
                    <p className='order-info'>Марка и модель авто: {orderData[0].autoName}</p>
                    <p className='order-info'>Тип автомобиля: {orderData[0].typeCar}</p>
                    <p className='order-info'>Статус: 
                        {orderData[0].status === 0 && ' Подтвержден'}
                        {orderData[0].status === 2 && ' Отменен'}
                        {orderData[0].status === 1 && ' Ожидает подтверждения'}
                        {orderData[0].status === 3 && ' Завершен'}
                    </p>
                    <p className='order-info'>Адрес электронной почты: {orderData[0].email}</p>
                    <p className='order-info'>ФИО: {orderData[0].name}</p>
                    <p className='order-info'>Телефон: {orderData[0].phone}</p>
                    {orderData[0].ditails && <p>Подробнее: {orderData[0].ditails}</p>}
                    <div className="buttons">
                        {!isLoading && userData.is_admin && orderData[0].status != 2 && orderData[0].status != 0 && orderData[0].status != 3 &&<button onClick={handleConfirm} className='confirm-button'>Принять заявку</button>}
                        {orderData[0].status != 2 && orderData[0].status != 3 && <button onClick={handleCancel} className='cancel-button'>Отменить заявку</button>}
                        {orderData[0].status === 0 && orderData[0].status != 3 && <button onClick={handleReady} className='ready-button'>Услага оказана</button>}
                    </div>
                </div>
            )}
        </div>
    )
}