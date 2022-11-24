import React from "react";
import LinkComponent from "../atoms/Link";
import ContainerTitle from "../molecules/ContainerTitle";
import TemplateInput from "../molecules/TemplateInput";
import Button from "../atoms/Button";
import { UserContext } from "../../store/UseContext";
import useForm from "../../utils/useForm";
import Error from '../atoms/Error';

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
    <div className='flex flex-1 flex-col gap-8 m-auto max-w-[450px]'>
      <ContainerTitle title="CoffeeZone"/>
      <div>
        <form onSubmit={loginAction} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <TemplateInput label="Email:" type="email" id="email" placeholder="Ex: email@gmail.com" {...email} />
            <TemplateInput label="Senha:" type="password" id="password" placeholder="********" {...password} />
          </div>
          {loading ? (
              <Button disabled>
                <div className="loading"></div>
              </Button>
            ) : (
              <Button>Entrar</Button>
            )
          }
          {errorLogin ? <Error>{errorLogin}</Error> : null}
        </form>
      </div>
      <LinkComponent path="/cadastro">Não possui uma conta? Crie agora!</LinkComponent>
    </div>
  )
}