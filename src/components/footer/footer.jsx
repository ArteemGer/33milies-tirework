import './footer.css';

export const Footer = () => {
    return(
    <footer className='footer'>
      <div className="container">
        <div className = 'phone'>
          <p>8 915 779-15-33 — Красный переулок, д. </p>
          <p>8 910 772-10-42— ул. Киржачская, д. 1Б</p>
        </div>
        <div className='mini-logo'>
          <img src='/mini-logo.png'/>
        </div>
        <div className='social-media'>
          <a href="https://vk.com/33miles" target='_blank'><img src='/social.png'/></a>
        </div>
      </div>
    </footer>
    )
}
