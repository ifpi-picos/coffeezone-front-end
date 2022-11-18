import React from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../../../store/UserContext";
import Title from '../../molecules/Title/Title';
import Input from '../../molecules/Input/Input';
import Button from '../../atoms/Button/Button';
import useForm from '../../../utils/useForm';
import Header from '../../organisms/header/Header';
import Modal from '../../organisms/Modal/Modal';

export default function Login(){
  
  const [errorProfile, setErrorProfile] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const {apiUrl, data, login, setLogin, loading, setLoading, error, navigate} = React.useContext(UserContext);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [loadingAlterProfile, setLoadingAlterProfile] = React.useState(false);
  const currentPassword = useForm('password');
  const newPassword = useForm('password');
  const name = useForm('name');

  async function alterProfile(e){
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }
  }

  async function deleteProfile (){
    try {
      console.log('dadwadmad,,')
      setLoadingDelete(true);
      let response = await fetch(`${apiUrl}/user`, {
        method: "DELETE",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      let json = await response.json();
      if(!response.ok) throw new Error(json);
      setLoadingDelete(false);
      console.log(json);
      navigate('/login');
    } catch (error) {
      setLoadingDelete(false);
      console.log(error);
    }
  }

  return(
   <div className={styles.profile}>
      <Header />
      <Title title="Perfil" />
      <div className={styles.form}>
        <form onSubmit={alterProfile}>
          <div className={styles.wrapperInputs}>
            <Input label="Tipo de usuário:" type="text" id="typeUserPageProfile" placeholder={data.role} disabled />
            {data.role === 'Membro' || data.role === 'Coordenador' ? (
                <Input label="Id do cartão:" type="text" id="cardIdPageProfile" placeholder={data.card} disabled />
              ) : null
            }
            <Input label="Nome:" type="text" id="namePageProfile" placeholder={data.name} {...name} />
            <Input label="Senha atual:" type="password" id="passwordPageProfile" placeholder="********" {...currentPassword} />
            <Input label="Nova senha:" type="password" id="newPasswordPageProfile" placeholder="********" {...newPassword} />
          </div>
          {/* <Button>Alterar perfil</Button> */}
          {loadingAlterProfile ? (
              <Button disabled>
                <div className="loading"></div>
              </Button>
            ) : (
              <Button>Alterar perfil</Button>
            )
          }
          {errorProfile ? <p className="error">{errorProfile}</p> : null}
        </form>
      </div>
      <Button color="#920000" onClick={() => {setModal(true)}}>Deletar perfil</Button>
      {modal ? (
          <Modal modal={modal} setModal={setModal}>
            <p>Tem certeza que deseja deletar seu perfil?</p>
            <div className={styles.wrapperButtons}>
              {/* <Button onClick={() => {setModal(false)}}>Cancelar</Button> */}
              {/* <Button color="#920000" onClick={deleteProfile}>Deletar perfil</Button> */}
              {loadingDelete ? (
                  <>
                    <Button onClick={() => {setModal(false)}} loading={true}>Cancelar</Button>
                    <Button color="#920000" loading={true}>
                      <div className="loading"></div>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => {setModal(false)}}>Cancelar</Button>
                    <Button color="#920000" onClick={deleteProfile}>Deletar</Button>
                  </>
                )
              }
            </div>
          </Modal>
        ) : null}
   </div>
  )
}