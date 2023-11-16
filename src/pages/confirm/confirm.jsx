import './confirm.css'
import { NavLink } from 'react-router-dom'

export function Confirm() {
    const backToHome = 
    {
        name:'Вернуться на главную',
        src:'/'
    }
    return(
        <div className="app">
            <main className="main-confirm">
                <img src="/confirm.png" alt="" />
                <p className='order-status'>Ваша заявка успешно отправлена </p>
                <button className='back-to-home'>
                    <NavLink to={backToHome.src}>
                        {backToHome.name}
                    </NavLink>
                </button>
            </main>
        </div>
    )
}