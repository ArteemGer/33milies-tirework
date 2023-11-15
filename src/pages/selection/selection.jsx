import React, { useState } from 'react'
import './selection.css'
import { useNavigate } from 'react-router-dom';
import { Price } from '../../components/price/price';


const cars = [
    {
        name:'Легковой',
        value:'passenger'
    },
    {
        name:'Кроссовер',
        value:'crossover'
    },
    {
        name:'Внедорожник',
        value:'SUV'
    },
    {
        name:'Микроавтобус',
        value:'minibus'
    },
    {
        name:'Коммерческий',
        value:'commercial'
    },
    {
        name:'Грузовой',
        value:'cargo'
    }
]


export const Selection = () => {
    const navigate = useNavigate()
    
    const [selectedAutoType, setSelectedAutoType] = useState('');
    const [selectedWheelType, setSelectedWheelType] = useState('');
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [isForm, setIsForm] = useState(false);
    


    const handleAutoTypeChange = (event) => {
        setSelectedAutoType(event.target.value);
    } 
    const handleWheelTypeChange = (event) => {
        setSelectedWheelType(event.target.value)
    }
    const handleWorkTypeChange = (event) => {
        setSelectedWorkType(event.target.value)
    }
    const showPrice = () => {
        if(selectedAutoType !== '' && selectedWheelType !== '' && selectedWorkType !== ''){
            setIsForm(true)
        }
    }

    return(   
        <div className='app'>
            <main className='selection'>
                <div className="first-item">
                    <button className='back' onClick={() => navigate(-1)}></button>
                    <h2 className='title'>Шиномонтаж</h2>
                </div>
                <form className='select-car'>
                    <div className="select-options">
                        <a target='_blank' className='address' href='https://yandex.ru/profile/56238521965?no-distribution=1&source=wizbiz_new_map_single'>Наш шиномонтаж находится по адресу: ул. Киржачская, д. 1Б.</a>
                        <div className="first-select-option">
                            <div className="auto-type">
                                <p>Тип автомобиля</p>
                                <select name="auto-type" id="auto-type" className='auto-type-select' onChange={handleAutoTypeChange}>
                                    <option value=""  hidden>Тип автомобиля</option>
                                    {cars.map(car => (
                                        <option value={car.value}>{car.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="wheel-type">
                                <p>Диаметр колеса</p>
                                <select name="wheel-type" id="wheel-type" className='wheel-type-select' onChange={handleWheelTypeChange}>
                                    <option value=""  hidden>Диаметр колеса</option>
                                    {[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(item => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="second-select-option">
                        <div className="work-type">
                                <p>Номер комплексных работ</p>
                                <select name="work-type" id="work-type" className='work-type-select' onChange={handleWorkTypeChange}>
                                    <option value=""  hidden>Номер комплексных работ</option>
                                    <option value="1">Комплекс 1 (смена колес в сборе)</option>
                                    <option value="2">Комплекс 2 (сезонная замена шин)</option>
                                </select>
                            </div>
                        </div>
                        <div className="button-select">
                                <button className='get-price' type='button' onClick={showPrice}>Узнать стоимость</button>
                                <button className='reset'>Сбросить</button>
                        </div>
                    </div>
                    <div className="photo-type-car">
                        <div className="photo">
                            {selectedAutoType === 'passenger' && <img src="./light.png" alt="passenger" />}
                            {selectedAutoType === 'crossover' && <img src="./crossover.png" alt="crossover" />}
                            {selectedAutoType === 'SUV' && <img src="./suv.png" alt="SUV" />}
                            {selectedAutoType === 'minibus' && <img src="./minibus.png" alt="minibus" />}
                            {selectedAutoType === 'commercial' && <img src="./commercial.png" alt="commercial" />}
                            {selectedAutoType === 'cargo' && <img src="./cargo.png" alt="cargo" />}
                            {selectedAutoType === '' && <img src="./no-type.png" alt="passenger" />}
                        </div>
                        <p className='car-type'>Тип вашего автомобиля:<br/>
                            {selectedAutoType === 'passenger' && <p>Легковой</p>}    
                            {selectedAutoType === 'crossover' && <p>Кроссовер</p>}   
                            {selectedAutoType === 'SUV' && <p>Внедорожник</p>}   
                            {selectedAutoType === 'minibus' && <p>Микроавтобус</p>}   
                            {selectedAutoType === 'commercial' && <p>Коммерческий</p>}   
                            {selectedAutoType === 'cargo' && <p>Грузовой</p>}  
                            {selectedAutoType === '' && <p>Не выбран</p>}   
                        </p>
                        <p className='footnote'>*Тип автомобиля смотрите в <br/>технических характеристиках от <br/> производителя автомобиля.</p>
                    </div>
                </form>
                {isForm && <Price car={selectedAutoType} wheel={selectedWheelType} work={selectedWorkType} />}
            </main>
        </div>
    )
}

