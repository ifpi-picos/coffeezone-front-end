import styles from "./Select.module.css";

export default function Select({label, name, values, id, value, onChange, children}){
  return(
    // <div className={styles.wrapperSelect}>
    //   <label className={styles.label} htmlFor={id}>{label}</label>
    //   <select id={id} name={name} className={styles.select} value={value} onChange={({target}) => {onChange(target.value)}}>
    //     {values.map(value => 
    //       <option className={styles.option} value={value} key={value}>{value}</option>)
    //     }
    //   </select>
    // </div>

    // [e.target.options[e.target.options.selectedIndex].value, e.target.options[e.target.options.selectedIndex]]
    <div className={styles.wrapperSelect}>
    <label className={styles.label} htmlFor={id}>{label}</label>
    <select id={id} name={name} className={styles.select} onChange={({target}) => onChange(target.value)}>
      {children}
    </select>
  </div>
  )
}