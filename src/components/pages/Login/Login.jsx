import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Title from "../../molecules/Title/Title";
import Input from "../../molecules/Input/Input";
import Button from "../../atoms/Button/Button";
import { UserContext } from "../../../store/UserContext";
import useForm from "../../../utils/useForm";

export default function Login(){

  const {apiUrl, data, setData, login, setLogin, loading, setLoading, error, navigate} = React.useContext(UserContext);
  // if(data){console.log(data)}

  const email = useForm('email');
  const password = useForm('password');
  const [errorLogin, setErrorLogin] = React.useState(null);

  async function loginAction(e){
    e.preventDefault();
    const validateEmail = email.validate()
    const validatePassword = password.validate()
    setErrorLogin(null);
    try {
      if(!validateEmail || !validatePassword) throw new Error();
      setLoading(true);
      let response = await fetch(`${apiUrl}/auth`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.value, 
          password: password.value
        })
      })
      let json = await response.json();
      if(!response.ok) throw new Error(json);
      console.log(json);
      // localStorage.setItem('token', json.token);
      setData(json);
      setLoading(false); 
      setLogin(true);
      navigate("/perfil");
    } catch (error) {
      setErrorLogin(error.message);
      setLoading(false); 
    }
  }

  // React.useEffect(() => {
  //   async function autoLogin () {
  //     try {
  //       let response = await fetch(`${apiUrl}/user`, {
  //         credentials: 'include'
  //       })
  //       let json = await response.json();
  //       if(!response.ok){
  //         throw new Error(json);
  //       }
  //       setData(json);
  //       setLogin(true);
  //     } catch (error) {
  //       console.log(error.message);
  //       setLogin(false);
  //     }
  //   }
  //   if(!login) autoLogin(); 
  // }, []);

  return(
    <div className={styles.login}>
      <Title title="CoffeeZone"/>
      <div className={styles.form}>
        <form onSubmit={loginAction}>
          <div className={styles.wrapperInputs}>
            <Input label="Email:" type="email" id="email" placeholder="Ex: email@gmail.com" {...email} />
            <Input label="Senha:" type="password" id="password" placeholder="********" {...password} />
          </div>
          {/* <Button>Entrar</Button> */}
          {loading ? (
              <Button disabled>
                <div className="loading"></div>
              </Button>
            ) : (
              <Button>Entrar</Button>
            )
          }
          {errorLogin ? <p className="error">{errorLogin}</p> : null}
        </form>
      </div>
      <Link className={styles.linkToSignUp} to="/cadastro">Não possui uma conta? Crie agora!</Link>
    </div>
  )
}