import Modal from '../atoms/Modal';
import WrapperModal from '../atoms/WrapperModal';

export default function TemplateModal ({children, modal, setModal}) {

  function handleClick (e) {
    if(e.target === e.currentTarget) setModal(false);
  }

  return(
    <WrapperModal onClick={handleClick}>
      <Modal>
        {children}
      </Modal>
    </WrapperModal>
  )
}