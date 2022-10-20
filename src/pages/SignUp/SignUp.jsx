import React from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import Title from "../../components/elements/Title/Title";
import Input from "../../components/form/Input/Input";
import Button from "../../components/form/Button/Button";
import Select from "../../components/form/Select/Select";
import { UserContext } from "../../store/UserContext";

import useForm from "../../utils/useForm";

export default function SignUp(){

  const {apiUrl, data, login, loading, error} = React.useContext(UserContext);

  const name = useForm('name');
  const email = useForm('email');
  const password = useForm('password');
  const confirmPassword = useForm('password');
  const [typeUser, setTypeUser] = React.useState('Visitor');

  async function signUp(e){
    e.preventDefault();
    const validateName = name.validate()
    const validateEmail = email.validate()
    const validatePassword = password.validate()
    confirmPassword.validate()
    if(confirmPassword.value !== password.value) confirmPassword.setError('Esta senha está diferente da anterior.')
    try {
      if(!validateName || !validateEmail || !validatePassword || password.value !== confirmPassword.value) throw new Error()
      let response = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          role: typeUser
        })
      })
      if(!response.ok) throw new Error('Não foi possível cadastrar-se, tente novamente.')
      let json = await response.json()
      console.log(json)
    } catch (error) {
      console.log('error: ', error.message)
    }
  }

  return(
    <div className={styles.signUp}>
      <Title title="CoffeeZone" subtitle="Cadastre-se o quanto antes  " />
      <div className={styles.form}>
        <form onSubmit={signUp}>
          <div className={styles.wrapperInputs}>
            <Input label="Nome:" type="text" id="nome" placeholder="Ex: Ítalo Paixão" {...name} />
            <Input label="Email:" type="email" id="email" placeholder="Ex: email@gmail.com" {...email} />
            <Input label="Senha:" type="password" id="password" placeholder="********" {...password} />
            <Input label="Confirmar senha:" type="password" id="confirmPassword" placeholder="********" {...confirmPassword}  />
            <Select id="selectTypeUser" label="Tipo de usuário" name="tipo de usuário" value={typeUser} onChange={setTypeUser}>
              <option className={styles.option} value="Visitor" key="Visitor">Visitante</option>
              <option className={styles.option} value="Member" key="Member">Membro</option>
              <option className={styles.option} value="Coordinator" key="Coordinator">Coordenador</option>
            </Select>
          </div>
          <Button>Cadastrar-se</Button>
        </form>
      </div>
      <Link className={styles.linkToSignIn} to="/signin">Já possui uma conta?</Link>
    </div>
  )
}