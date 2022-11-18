import styles from "./Select.module.css";

export default function Select({label, name, values, id, value, onChange, children}){
  return(
    <div className={styles.wrapperSelect}>
    <label className={styles.label} htmlFor={id}>{label}</label>
    <select id={id} name={name} className={styles.select} onChange={({target}) => onChange(target.value)}>
      {children}
    </select>
  </div>
  )
}