import { supabase } from "../../supabaseClient";
import React, { useState, useEffect } from "react";
import './profile.css'
import { useLocation, useNavigate, NavLink } from 'react-router-dom';

export const Profile = () => {
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [isLoading , setIsLoading] = useState(true)
    const [gridData, setGridData] = useState([]);

    const navigate = useNavigate()


    

    useEffect(()=>{
        (async ()=>{
          const { data } = await supabase.auth.getUser()
          if(isLoading && data.user && data.user.email){
            setIsLoading(false)
            setUser(data.user)
            const { data: data2, error } = await supabase
                .from('profile')
                .select()
                .eq('email', data.user.email);
            setUserData(data2[0]);
            console.log(data2[0]);
            console.log(userData);
          }
        })()
    })

    const signOut = async() => {
        const { error } = await supabase.auth.signOut()
        return window.location.href = `${window.location.origin}/`;
    }



    useEffect(() => {
        const getAllOrders = async () => {
          const { data, error } = await supabase
          .from('orders')
          .select('*');
          if (error) {
            console.error('Ошибка при получении данных:', error.message);
          } else {
            setGridData(data); 
          }
        };
    
        getAllOrders(); 
      }, []);



    return(
        <div className="profile-data">
            <div className="profile-head">
                <button className='back' onClick={() => navigate(-1)}></button>
                <h3 className="user-type">Личный кабинет{userData && userData.is_admin == true ? " менеджера" : null}</h3>
            </div>
            <div className="grid-container">
                <div className="grid-titles-container">
                    <div className="grid-title">ID</div>
                    <div className="grid-title di-item">Диаметр колеса</div>
                    <div className="grid-title number-item">№ Комплекса</div>
                    <div className="grid-title date-item date-title">Дата/время</div>
                    <div className="grid-title car-item car-title">Марка/модель авто</div>
                    <div className="grid-title status-title">Статус</div>
                    <div className="grid-title"></div>
                </div>

                
                    {userData && userData.is_admin ? (
                        <React.Fragment>
                        {gridData.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="grid-items-container">
                                    <div className="grid-item">{item.id}</div>
                                    <div className="grid-item">{item.wheelDiameter}</div>
                                    <div className="grid-item">{item.jobNumber}</div>
                                    <div className="grid-item date-item">{item.date} {item.time}</div>
                                    <div className="grid-item car-item">{item.autoName}</div>
                                    <div className="grid-item">
                                        {item.status === 0 && <img src="./confirmWork.png" alt="" />}
                                        {item.status === 2 && <img src="./no.png" alt="" />}
                                        {item.status === 1 && <img src="./wait.png" alt="" />}
                                        {item.status === 3 && <img src="./finish.png" alt="" />}
                                    </div>
                                        <div className="grid-item">
                                        <NavLink to={`/order?id=${item.id}`}>
                                            <button className="read-more">Подробнее</button>
                                        </NavLink>    
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                            })}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        {gridData.map((item, index) => {
                            if(item.email === user.email){
                                return (
                                    <React.Fragment key={index}>
                                        <div className="grid-items-container">
                                            <div className="grid-item">{item.id}</div>
                                            <div className="grid-item">{item.wheelDiameter}</div>
                                            <div className="grid-item">{item.jobNumber}</div>
                                            <div className="grid-item date-item">{item.date} {item.time}</div>
                                            <div className="grid-item car-item">{item.autoName}</div>
                                            <div className="grid-item">
                                                {item.status === 0 && <img src="./confirmWork.png" alt="" />}
                                                {item.status === 2 && <img src="./no.png" alt="" />}
                                                {item.status === 1 && <img src="./wait.png" alt="" />}
                                                {item.status === 3 && <img src="./finish.png" alt="" />}
                                            </div>
                                                <div className="grid-item">
                                                <NavLink to={`/order?id=${item.id}`}>
                                                    <button className="read-more">Подробнее</button>
                                                </NavLink>    
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                            }
                            })}
                        </React.Fragment>
                    )}
            </div>
            <div className="user-data">
                <div className="user-info">
                    <div className="type-info">
                        <p>Имя</p>
                        <p>Электронная почта</p>
                        <p>Номер телефона</p>
                    </div>
                    <div className="info-current">
                        <p>{userData && userData.full_name}</p>
                        <p>{userData && userData.email}</p>
                        <p>{userData && userData.phone_number}</p>
                    </div>
                </div>
                <button className="log-out" onClick={() => signOut()}>Выйти из аккаунта</button>
            </div>
        </div>

    )
}

