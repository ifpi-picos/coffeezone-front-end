import React from "react";
import { UserContext } from "../../../store/UseContext";
import styles from "./Header.module.css";
import {ReactComponent as Profile} from '../../../assets/User.svg';
import {ReactComponent as Signout} from '../../../assets/SignOut.svg';
import {ReactComponent as CloseMenu} from '../../../assets/X.svg';
import {ReactComponent as OpenMenu} from '../../../assets/Menu.svg';
import LinkComponent from '../../atoms/Link';

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
          <CloseMenu className={`${styles.icon} ${styles.iconMenu}`} onClick={() => {setMenuOpen(!menuOpen)}} />
        ) : (
          <OpenMenu className={`${styles.icon} ${styles.iconMenu}`} onClick={() => {setMenuOpen(!menuOpen)}} />
        )
      }
      <header className={`absolute top-0 right-0 left-0 bg-neutral transition-200 ${!menuOpen && windowWidth < 640  ? styles.hiddenMenu : null}`}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperLink}>
            <Profile className={styles.icon} />
            <LinkComponent to="/perfil">Perfil</LinkComponent>
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