import React from "react";
import { UserContext } from "../../../store/UserContext";
import styles from "./Header.module.css";
import {ReactComponent as Profile} from '../../../assets/User.svg';
import {ReactComponent as Signout} from '../../../assets/SignOut.svg';
import {ReactComponent as X} from '../../../assets/X.svg';
import {ReactComponent as Menu} from '../../../assets/Menu.svg';
import { Link } from 'react-router-dom';

export default function Header(){

  const {navigate} = React.useContext(UserContext);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleWindowResize () {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {window.removeEventListener('resize', handleWindowResize)}
  })

  async function signout () {
    navigate('/login');
  }

  return(
    <>
      {menuOpen ? (
          <X className={`${styles.icon} ${styles.iconMenu}`} onClick={() => {setMenuOpen(!menuOpen)}} />
        ) : (
          <Menu className={`${styles.icon} ${styles.iconMenu}`} onClick={() => {setMenuOpen(!menuOpen)}} />
        )
      }
      <header className={`${styles.header} ${!menuOpen && windowWidth < 640  ? styles.hiddenMenu : null}`}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperLink}>
            <Profile className={styles.icon} />
            <Link to="/perfil">Perfil</Link>
          </div>
          <div className={styles.wrapperLink}>
            <Signout className={styles.icon} />
            <button className={styles.buttonSignout} onClick={signout}>Sair</button>
          </div>
        </div>
      </header>
    </>
  )
}