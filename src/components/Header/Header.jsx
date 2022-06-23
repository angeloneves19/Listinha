import LogoImage from '../../assets/logo.svg'
import './header.styles.css'

const Header = () =>{
   return(
<header className= 'header'>
    <div>
        <img src={LogoImage} alt='logotipo minha listinha com imagem de avião'/>
    </div>
</header>
   )
}

export default Header