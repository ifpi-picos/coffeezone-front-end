import styles from "./Modal.module.css";

export default function Modal ({children, modal, setModal}) {

  function handleClick (e) {
    if(e.target === e.currentTarget) setModal(false);
  }

  return(
    <div className={styles.modal} onClick={handleClick}>
      <div className={styles.contentModal}>
        {children}
      </div>
    </div>
  )
}