import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Title from "../../components/elements/Title/Title";
import Input from "../../components/form/Input/Input";
import Button from "../../components/form/Button/Button";
import { UserContext } from "../../store/UserContext";
import useForm from "../../utils/useForm";

export default function Login(){

  const {apiUrl, data, login, loading, setLoading, error} = React.useContext(UserContext);

  const email = useForm('email');
  const password = useForm('password');

  async function loginAction(e){
    e.preventDefault();
    const validateEmail = email.validate()
    const validatePassword = password.validate()
    try {
      if(!validateEmail || !validatePassword) throw new Error();
      setLoading(true);
      let response = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      let json = await response.json()
      if(!response.ok) throw new Error(json)
      setLoading(false); 
    } catch (error) {
      setLoading(false); 
    }
  }

  return(
    <div className={styles.login}>
      <Title title="CoffeeZone"/>
      <div className={styles.form}>
        <form onSubmit={loginAction}>
          <div className={styles.wrapperInputs}>
            <Input label="Email:" type="email" id="email" placeholder="Ex: email@gmail.com" {...email} />
            <Input label="Senha:" type="password" id="password" placeholder="********" {...password} />
          </div>
          <Button>Entrar</Button>
        </form>
      </div>
      <Link className={styles.linkToSignUp} to="/cadastro">Não possui uma conta? Crie agora!</Link>
    </div>
  )
}