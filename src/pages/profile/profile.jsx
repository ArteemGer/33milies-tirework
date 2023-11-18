import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";
import './profile.css'
import { useLocation, useNavigate } from 'react-router-dom';

export const Profile = () => {
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [isLoading , setIsLoading] = useState(true)

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
          }
        })()
    })

    const signOut = async() => {
        const { error } = await supabase.auth.signOut()
        return window.location.href = `${window.location.origin}/`;
    }



    return(
        <div className="profile-data">
            <div className="profile-head">
                <button className='back' onClick={() => navigate(-1)}></button>
                <h3 className="user-type">Личный кабинет{userData && userData.is_admin == true ? " менеджера" : null}</h3>
            </div>
            <div class="grid-container">
                <div class="grid-title">ID</div>
                <div class="grid-title">Диаметр колеса</div>
                <div class="grid-title">№ Комплекса</div>
                <div class="grid-title">Дата/время</div>
                <div class="grid-title">Марка/модель авто</div>
                <div class="grid-title">Статус</div>
                <div class="grid-title"></div>

                <div class="grid-item">1111</div>
                <div class="grid-item">22</div>
                <div class="grid-item">№1</div>
                <div class="grid-item">12.12.2023 13:00</div>
                <div class="grid-item">Audi q5</div>
                <div class="grid-item"><img src="./confirmWork.png" alt="" /></div>
                <div class="grid-item"><button className="read-more" onClick={console.log('pipa')}>Подробнее</button></div>

                <div class="grid-item">1111</div>
                <div class="grid-item">15</div>
                <div class="grid-item">№1</div>
                <div class="grid-item">12.12.2023 12:00</div>
                <div class="grid-item">Kia Rio</div>
                <div class="grid-item"><img src="./no.png" alt="" /></div>
                <div class="grid-item"><button className="read-more" onClick={console.log('pipa')}>Подробнее</button></div>

                <div class="grid-item">1111</div>
                <div class="grid-item">15</div>
                <div class="grid-item">№1</div>
                <div class="grid-item">12.12.2023 12:00</div>
                <div class="grid-item">Kia Rio</div>
                <div class="grid-item"><img src="./wait.png" alt="" /></div>
                <div class="grid-item"><button className="read-more" onClick={console.log('pipa')}>Подробнее</button></div>

                <div class="grid-item">1111</div>
                <div class="grid-item">15</div>
                <div class="grid-item">№1</div>
                <div class="grid-item">12.12.2023 12:00</div>
                <div class="grid-item">Kia Rio</div>
                <div class="grid-item"><img src="./finish.png" alt="" /></div>
                <div class="grid-item"><button className="read-more" onClick={console.log('pipa')}>Подробнее</button></div>
                
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

