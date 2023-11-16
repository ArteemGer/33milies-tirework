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

