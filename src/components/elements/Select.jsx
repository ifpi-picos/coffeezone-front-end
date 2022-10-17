import styles from "./Select.module.css";

export default function Select({label, name, values, id, value, onChange}){
  return(
    <div className={styles.wrapperSelect}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <select id={id} name={name} className={styles.select} value={value} onChange={({target}) => {onChange(target.value)}}>
        {values.map(value => 
          <option className={styles.option} value={value} key={value}>{value}</option>)
        }
      </select>
    </div>
  )
}