import { UserContext } from "../../../store/UserContext";
import styles from "./Button.module.css";
import React from "react";

export default function Button({children, color, onClick, loading}){

  // const {loading} = React.useContext(UserContext);

  if(loading){
    return <button className={styles.button} disabled style={{backgroundColor: color}}>
      {children}
    </button>
  } else {
    return <button className={styles.button} style={{backgroundColor: color}} onClick={onClick}>{children}</button>
  }

  // return <button className={styles.button} style={{backgroundColor: color}} onClick={onClick}>{children}</button>
}