import { useNavigate } from 'react-router-dom';
import { Price } from '../../components/price/price';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

import './payment.css'
export function Payment() {
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
        window.scrollTo(0, 0); // Прокрутить вверх при монтировании компонента
    }, []);
    
    return(
        <div className="app">
            <main className="payment">
                <div className="first-item">
                    <button className='back' onClick={() => navigate(-1)}></button>
                    <h2 className='title'>Шиномонтаж</h2>
                </div>
                <form className='input-info'>
                    <div className="inputs">
                        <p>Контактное лицо</p>
                        <input type="text" className='input'/>
                        <p>Телефон</p>
                        <input type="text" className='input'/>
                        <p>Адрес электронной почты</p>
                        <input type="text" className='input'/>
                        <p>Марка и модель авто</p>
                        <input type="text" className='input'/>
                        <p>Подробности</p>
                        <input type="text" className='input add'/>
                    </div>
                    <div className="date">
                        <a target='_blank' className='address' href='https://yandex.ru/profile/56238521965?no-distribution=1&source=wizbiz_new_map_single'>Наш шиномонтаж находится по адресу: ул. Киржачская, д. 1Б.</a>
                        <div className="date-choose">
                            
                        </div>
                        <button className='confirm'>
                            <NavLink to={confirm.src}>
                                {confirm.name}
                            </NavLink>
                        </button>
                    </div>
                </form>
                <Price car={car} wheel={wheel} work={work} />
            </main>
        </div>
    )
}