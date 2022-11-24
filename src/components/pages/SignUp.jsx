import React from "react";
import LinkComponent from "../atoms/Link";
import ContainerTitle from "../molecules/ContainerTitle";
import TemplateInput from "../molecules/TemplateInput";
import Button from "../atoms/Button";
import { UserContext } from "../../store/UseContext";
import useForm from "../../utils/useForm";
import Error from '../atoms/Error';

export default function SignUp(){

  const {apiUrl, data, login, loading, setLoading, error, setError, navigate} = React.useContext(UserContext);

  const name = useForm('name');
  const email = useForm('email');
  const password = useForm('password');
  const confirmPassword = useForm('password');

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
    <div className='flex flex-1 flex-col gap-8 m-auto max-w-[450px]'>
      <ContainerTitle title="CoffeeZone" subtitle="Cadastre-se o quanto antes" />
      <div>
        <form onSubmit={signUp} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <TemplateInput label="Nome:" type="text" id="name" placeholder="Ex: Ítalo Paixão" {...name} />
            <TemplateInput label="Email:" type="email" id="email" placeholder="Ex: email@gmail.com" {...email} />
            <TemplateInput label="Senha:" type="password" id="password" placeholder="********" {...password} />
            <TemplateInput label="Confirmar senha:" type="password" id="confirmPassword" placeholder="********" {...confirmPassword}  />
          </div>
          {loading ? (
              <Button disabled loading={true}>
                <div className="loading"></div>
              </Button>
            ) : (
              <Button>Entrar</Button>
            )
          }
          {error ? <Error>{error}</Error> : null}
        </form>
      </div>
      {/* <Link className={styles.linkToSignIn} to="/login">Já possui uma conta?</Link> */}
      <LinkComponent path="/login">Já possui uma conta?</LinkComponent>
    </div>
  )
}