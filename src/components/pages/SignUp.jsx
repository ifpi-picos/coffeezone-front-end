import React from "react";
import { Link } from "react-router-dom";
import Title from "../elements/Title";
import styles from "./SignUp.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Select from "../elements/Select";

export default function SignUp(){

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [typeUser, setTypeUser] = React.useState('Visitante');

  function handleSubmit(e){
    e.preventDefault();
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
    console.log(typeUser)
  }

  return(
    <div className={styles.signUp}>
      <Title title="CoffeeZone" subtitle="Cadastre-se o quanto antes  " />
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.wrapperInputs}>
            <Input label="Nome: " type="text" id="nome" placeholder="Ex: Ítalo Paixão" value={name} onChange={setName} />
            <Input label="Email: " type="email" id="emmail" placeholder="exemplo@gmail.com" value={email} onChange={setEmail} />
            <Input label="Senha: " type="password" id="password" placeholder="********" value={password} onChange={setPassword} />
            <Input label="Confirmar senha: " type="password" id="confirmPassword" placeholder="********" value={confirmPassword} onChange={setConfirmPassword} />
            <Select id="selectTypeUser" label="Tipo de usuário" name="tipo de usuário" values={["Visitante", "Membro", "Coordenador"]} value={typeUser} onChange={setTypeUser}  />
          </div>
          <Button>Cadastrar-se</Button>
        </form>
      </div>
      <Link className={styles.linkToSignIn} to="/signin">Já possui uma conta?</Link>
    </div>
  )
}