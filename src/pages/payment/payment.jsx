import { useNavigate } from 'react-router-dom';
import { Price } from '../../components/price/price';
import { useEffect, useState } from 'react';
import YandexMap from '../../components/yandexMap/yandexMap';

import './payment.css'
import { supabase } from '../../supabaseClient';
export function Payment() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [carName, setCarName] = useState('')
    const [ditails, setDitails] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [alert, setAlert] = useState('alert')
    const [alertPast, setAlertPast] = useState('alertPast')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleName = (event) =>{
        setName(event.target.value)
    }
    const handlePhone = (event) =>{
        setPhone(event.target.value)
    }
    const handleEmail = (event) =>{
        setEmail(event.target.value)
    }
    const handleCarName = (event) =>{
        setCarName(event.target.value)
    }
    const handleDitails = (event) =>{
        setDitails(event.target.value)
    }
    const handleDate = (event) =>{
        setDate(event.target.value)
    }
    const handleTime = (event) =>{
        setTime(event.target.value)
    }
    


    const navigate = useNavigate()
    const confirm = 
    {
        name:'Записаться',
        src:'/Confirm'
    }
    const searchParams = new URLSearchParams(window.location.search);
    const car = searchParams.get("car");
    const wheel = searchParams.get("wheel");
    const work = searchParams.get("work");

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);
    

    const allDate = [];
    const allTime = []
    useEffect(() => {
        (async () => {
            const {data, error} = await supabase
            .from('orders')
            .select('*')
            let hasMatch = false
            const currentDate = new Date()
            const nowHours = currentDate.toLocaleDateString()
            const nowDate = currentDate.getDate() 

            //доделай проверку на коректную дату

            data.map((e) => {
                allDate.push(e.date)
                allTime.push(e.time.slice(0, -3))
                if(date == e.date && time == e.time.slice(0, -3)){
                    hasMatch = true
                }

            })
            if(hasMatch){
                setAlert('alert is-visible')
                setIsButtonDisabled(true)
            } else{
                setAlert('alert')
                setIsButtonDisabled(false)
            }
        })()
        
    }, [date,time])



    async function addOrder() {
        const {data, error} = await supabase
        .from ('orders')
        .insert({
            wheelDiameter: wheel,
            jobNumber: work,
            date: date,
            time: time,
            typeCar: car,
            autoName: carName,
            status: 1,
            ditails: ditails,
            name: name,
            phone: phone,
            email: email,
        })
        
        
        if(error == null){
            navigate(confirm.src)
        } else{
            console.log('Заполните все нужные поля')
        }
    }
    
    return(
        <div className="app">
            <main className="payment">
                <div className="first-item">
                    <button className='back' onClick={() => navigate(-1)}></button>
                    <h2 className='title'>Шиномонтаж</h2>
                </div>
                <form className='input-info'>
                    <div className="inputs">
                        <p className='inputs-text'>Контактное лицо</p>
                        <input type="text" className='input' onChange={handleName}/>
                        <p className='inputs-text'>Телефон</p>
                        <input type="text" className='input' onChange={handlePhone}/>
                        <p className='inputs-text'>Адрес электронной почты</p>
                        <input type="text" className='input' onChange={handleEmail}/>
                        <p className='inputs-text'>Марка и модель авто</p>
                        <input type="text" className='input' onChange={handleCarName}/>
                        <p className='inputs-text'>Подробности*</p>
                        <input type="text" className='input add' onChange={handleDitails}/>
                        <p className='micro-text'>* - не обязательные поля</p>
                    </div>
                    <div className="date">
                        {YandexMap()}
                        <div className="date-choose">
                            <div className="date-block">
                                <p>Дата</p>
                                <input type="date" className='date-pick' name="date" id="date" onChange={handleDate} />
                            </div>
                            <div className="time-block">
                                <p>Время</p>
                                <select className='time-pick' name="time" id="time" onChange={handleTime}>
                                    <option value="Выбирете время" hidden>Выбирете время</option>
                                    <option value="8:00">8:00</option>
                                    <option value="9:00">9:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                    <option value="19:00">19:00</option>
                                </select>
                                <h4 className={alert}>выбранная дата и время занаты</h4>
                                <h4 className={alertPast}>выбирете корректную дату</h4>
                            </div>
                        </div>
                        <button className='confirm' type='button' disabled={isButtonDisabled} onClick={addOrder}>
                            {confirm.name}
                        </button>
                    </div>
                </form>
                <Price car={car} wheel={wheel} work={work} />
            </main>
        </div>
    )
}