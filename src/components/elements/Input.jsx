import styles from "./Input.module.css";

export default function Input({placeholder, label, type, id, value, onChange}){
  return(
    <div className={styles.wrapperInput}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input placeholder={placeholder} id={id} className={styles.input} type={type} value={value} onChange={({target}) => onChange(target.value)} />
    </div>
  )
}