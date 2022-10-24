import { UserContext } from "../../../store/UserContext";
import styles from "./Button.module.css";
import React from "react";

export default function Button({children}){

  const {loading} = React.useContext(UserContext);

  if(loading){
    return <button className={`${styles.button}`} disabled>
      <div className={styles.loading}></div>
    </button>
  } else {
    return <button className={styles.button}>{children}</button>
  }
}