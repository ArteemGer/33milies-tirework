import './404.css'
import { NavLink } from 'react-router-dom'

export function Page404(){
    const backToHome = 
    {
        name:'Вернуться на главную',
        src:'/'
    }
    return(
        <div className="app">
            <main className='main-404'>
                <img src="/404.png" alt="" />
                <p className='no-page'>Такой страницы нет</p>
                <button className='back-to-home'>
                    <NavLink to={backToHome.src}>
                        {backToHome.name}
                    </NavLink>
                </button>
            </main>
        </div>
    )
}

