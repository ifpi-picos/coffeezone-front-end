import React from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import Title from "../../molecules/Title/Title";
import Input from "../../molecules/Input/Input";
import Select from "../../molecules/Select/Select";
import Button from "../../atoms/Button/Button";
import { UserContext } from "../../../store/UserContext";
import useForm from "../../../utils/useForm";

export default function SignUp(){

  const {apiUrl, data, login, loading, setLoading, error, setError, navigate} = React.useContext(UserContext);

  const name = useForm('name');
  const email = useForm('email');
  const password = useForm('password');
  const confirmPassword = useForm('password');
  const [typeUser, setTypeUser] = React.useState('Visitor');

  React.useEffect(()=> {
    setError(null);
  }, [])

  async function signUp(e){
    e.preventDefault();
    setError(null);
    const validateName = name.validate()
    const validateEmail = email.validate()
    const validatePassword = password.validate()
    confirmPassword.validate()
    if(confirmPassword.value !== password.value) confirmPassword.setError('Esta senha está diferente da anterior.')
    try {
      if(!validateName || !validateEmail || !validatePassword || password.value !== confirmPassword.value) throw new Error();
      setLoading(true);
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
      let json = await response.json()
      if(!response.ok) throw new Error(json)
      console.log(json)
      setLoading(false); 
      navigate("/login");
    } catch (error) {
      setLoading(false); 
      setError(error.message);
    }
  }

  return(
    <div className={styles.signUp}>
      <Title title="CoffeeZone" subtitle="Cadastre-se o quanto antes" />
      <div className={styles.form}>
        <form onSubmit={signUp}>
          <div className={styles.wrapperInputs}>
            <Input label="Nome:" type="text" id="name" placeholder="Ex: Ítalo Paixão" {...name} />
            <Input label="Email:" type="email" id="email" placeholder="Ex: email@gmail.com" {...email} />
            <Input label="Senha:" type="password" id="password" placeholder="********" {...password} />
            <Input label="Confirmar senha:" type="password" id="confirmPassword" placeholder="********" {...confirmPassword}  />
            <Select id="selectTypeUser" label="Tipo de usuário" name="tipo de usuário" value={typeUser} onChange={setTypeUser}>
              <option className={styles.option} value="Visitor" key="Visitor">Visitante</option>
              <option className={styles.option} value="Member" key="Member">Membro</option>
              <option className={styles.option} value="Coordinator" key="Coordinator">Coordenador</option>
            </Select>
          </div>
          {loading ? (
              <Button disabled loading={true}>
                <div className="loading"></div>
              </Button>
            ) : (
              <Button>Entrar</Button>
            )
          }
          {error ? <p className="error">{error}</p> : null}
        </form>
      </div>
      <Link className={styles.linkToSignIn} to="/login">Já possui uma conta?</Link>
    </div>
  )
}