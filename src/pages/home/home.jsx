import './home.css'
import { NavLink } from 'react-router-dom';
import React, { useState,useEffect }from 'react';

const firstButton = 
{
  name:'Заказать услугу',
  src:'/Selection'
}

export function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 320);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
      <div className="App">
        <main className='main'>
            <div className = 'first-block'>
              <div className='first-block-all'>
                <h3 className='first-block-title'>Шиномонтаж</h3>
                <p className='first-block-text'>Шиномонтаж любой сложности.</p> 
                <p className='first-block-text'>Комплект R15 от 580 р./колесо!</p>
                <button className='first-block-button'>
                    <NavLink className='button-link' to={firstButton.src}>
                        {firstButton.name}
                    </NavLink>
                </button>
              </div>
            </div>
            <div className='second-block' id='second-block'>
              <div className='first-line'></div>
              <div className='first-text-info'>
                <div className='block-info'>
                  <p className='info-title'>О компании</p>
                  <p className = 'info'>Шиномонтаж в 33 МИЛИ.ru – это специализированная услуга, предоставляемая мастерами на самом современном оборудовании, обеспечивающем замену колес по европейским стандартам качества.<br></br>{isSmallScreen ? '' : 'Услуга шиномонтажа предоставляется в современном полностью оборудованном помещении. Мы используем высокоточные манометры, обеспечивающие оптимальное давление для эффективной эксплуатации резины, с учетом модели авто и сезона года.'}</p>
                </div>
                <div className='image1'>
                  <img src='/image2.png'></img>
                </div>
              </div>
            </div>
            <div className='first-line'></div>
            <div className='second-text-info' id='third-block'>
              <img src='/image3.png'></img>
              <div className='block-info2'>
                <div className='info2-text'>
                  <p className = 'info2-title'>Процесс работы</p>
                  <div className = 'info2'>
                    {isSmallScreen ? 
                      <p>Услуга шиномонтажа предоставляется в современном полностью оборудованном помещении. Мы используем высокоточные манометры, обеспечивающие оптимальное давление для эффективной эксплуатации резины, с учетом модели авто и сезона года.</p> : null
                    }
                    <div className="more-text">
                      <p>Работы, проводимые при комплексном шиномонтаже в Александрове, Балакирево, Струнино:</p>
                      <ul>
                        <li>Мойка колес с использованием специальных средств – устраняются загрязнения всех типов;</li>
                        <li>Установка и замена автомобильных шин - применяется современное оборудование, процесс занимает минимальное время;</li>
                        <li>Установка и замена автомобильных дисков;</li>
                        <li>Точечный или комплексный ремонт камер.</li>
                      </ul>
                      <p>В нашем шиномонтаже используются высокоточные фланцевые адаптеры, защищающие резину во время монтажа от механических повреждений, которые могут повлиять на качество эксплуатации и срок службы резины.</p>
                    </div>
                    <button className='second-block-button'>                    
                      <NavLink className='second-button-link' to={firstButton.src}>
                          {firstButton.name}
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>
            </div> 
        </main>
      </div> 


  );
}

export default Home;
