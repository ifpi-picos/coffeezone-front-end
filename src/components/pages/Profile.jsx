import React from "react";
import { UserContext } from "../../store/UseContext";
import Titles from '../molecules/ContainerTitle';
import TemplateInput from '../molecules/TemplateInput';
import Button from '../atoms/Button';
import useForm from '../../utils/useForm';
import Header from '../organisms/header/Header';
import TemplateModal from '../molecules/TemplateModal';
import Error from '../atoms/Error';

export default function Profile(){
  
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
   <div className='flex flex-1 flex-col gap-8 m-auto max-w-[450px]'>
      <Header />
      <Titles title="Perfil" />
      <div>
        <form onSubmit={alterProfile} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <TemplateInput label="Tipo de usuário:" type="text" id="typeUserPageProfile" placeholder={data.role} disabled />
            {data.role === 'Membro' || data.role === 'Coordenador' ? (
                <TemplateInput label="Id do cartão:" type="text" id="cardIdPageProfile" placeholder={data.card} disabled />
              ) : null
            }
            <TemplateInput label="Nome:" type="text" id="namePageProfile" placeholder={data.name} {...name} />
            <TemplateInput label="Senha atual:" type="password" id="passwordPageProfile" placeholder="********" {...currentPassword} />
            <TemplateInput label="Nova senha:" type="password" id="newPasswordPageProfile" placeholder="********" {...newPassword} />
          </div>
          {loadingAlterProfile ? (
              <Button disabled>
                <div className="loading"></div>
              </Button>
            ) : (
              <Button>Alterar perfil</Button>
            )
          }
          {errorProfile ? <Error>{errorProfile}</Error> : null}
        </form>
      </div>
      <Button color="#920000" onClick={() => {setModal(true)}}>Deletar perfil</Button>
      {modal ? (
          <TemplateModal modal={modal} setModal={setModal}>
            <p>Tem certeza que deseja deletar seu perfil?</p>
            <div className='flex gap-8 m-auto'>
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
          </TemplateModal>
        ) : null}
   </div>
  )
}