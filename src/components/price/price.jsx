import './price.css';
import { NavLink,useLocation } from 'react-router-dom';

const payButton = 
{
    name:'Оформление заказа',
    src:'/Payment'
}

export const Price = ({car,wheel,work}) =>{

    const carName = car === 'passenger' ? 'легковых автомобилей' : 
    car === 'crossover' ? 'кроссоверов' :
    car === 'SUV' ? 'внедорожников' :
    car === 'minibus' ? 'микроавтобусов' :
    car === 'commercial' ? 'коммерческих автомобилей' :
    car === 'cargo' ? 'Грузовых автомобилей' :
    car;

    const location = useLocation()
    
    const getPrice = (car) => {
        let firstWork
        let secondWork
        let thirdWork
        let fourthWork
        let fifthWork
        if(car === 'passenger'){
            firstWork = 100
            secondWork = 100
            thirdWork = 400
            fourthWork = 100
            fifthWork = 300
        } else if(car === 'crossover'){
            firstWork = 150
            secondWork = 150
            thirdWork = 450
            fourthWork = 150
            fifthWork = 350
        }  else if(car === 'SUV'){
            firstWork = 200
            secondWork = 200
            thirdWork = 500
            fourthWork = 200
            fifthWork = 400
        }  else if(car === 'minibus'){
            firstWork = 250
            secondWork = 250
            thirdWork = 550
            fourthWork = 250
            fifthWork = 450
        }  else if(car === 'commercial'){
            firstWork = 300
            secondWork = 300
            thirdWork = 600
            fourthWork = 300
            fifthWork = 500
        }  else if(car === 'cargo'){
            firstWork = 350
            secondWork = 350
            thirdWork = 650
            fourthWork = 350
            fifthWork = 550
        } 
        return [firstWork, secondWork, thirdWork, fourthWork, fifthWork]
    }
    getPrice(car)
    

    return(
        <div className="show-price">
            <h2 className="price-title">СТОИМОСТЬ УСЛУГ ДЛЯ {carName} С КОЛЕСАМИ R{wheel}, комплекс {work}</h2>
            <div className="all-works">
                <p className="type-of-work">Наименование услуги</p>
                <p className="price-of-work">Цена за 1 колесо</p>
            </div>
            <div className="list-of-works">
                <div className="name-of-work">
                    <p>Снятие-установка колес</p>
                    <p>Мойка колес</p>
                    <p>Монтаж-Демонтаж колес</p>
                    <p>Герметизация борта</p>
                    <p>Балансировка колес</p>
                </div>
                <div className="price-of-name-work">
                    <p>{getPrice(car)[0]} ₽</p>
                    <p>{getPrice(car)[1]} ₽</p>
                    <p>{getPrice(car)[2]} ₽</p>
                    <p>{getPrice(car)[3]} ₽</p>
                    <p>{getPrice(car)[4]} ₽</p>
                </div>
            </div>
            <div className="price-bottom">
                {location.pathname !== payButton.src ?(
                    <button className='price'>
                        <NavLink 
                            to={`${payButton.src}?car=${car}&wheel=${wheel}&work=${work}`}
                        >
                            {payButton.name}
                        </NavLink>
                    </button>
                ): null}

                <p className='total-price'>Итог:{getPrice(car)[0] + getPrice(car)[1] + getPrice(car)[2] + getPrice(car)[3] + getPrice(car)[4]} ₽</p>
            </div>
        </div>
    )
}