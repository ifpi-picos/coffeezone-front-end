import styles from "./Title.module.css";

export default function Title({title, subtitle}){
  return(
    <div className={styles.wrapperTitle}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <h2 className={styles.subtitle}>{subtitle}</h2> : null}
    </div>
  )
}