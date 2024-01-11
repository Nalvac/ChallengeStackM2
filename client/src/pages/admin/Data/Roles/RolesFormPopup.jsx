import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

Modal.setAppElement('#root');
const RolesFormPopup = ({openModal, isModalOpen, closeModal}) => {


  const validationSchema= yup.object(
    {
      name: yup.string(),
    }
  )

  const initialValues =  {
    name: '',
  }

  const {
    handleSubmit,
    register,
  } = useForm({defaultValues: initialValues, resolver: yupResolver(validationSchema)});

  const submit = handleSubmit(async(values) => {
    console.log(values);
    closeModal()
  })


  const customStyles = {
    content: {
      width: '50%',
      maxHeight: '300px',
      margin: 'auto',
    },
  };

  return (
    <div>
      <button onClick={openModal}>Ouvrir le formulaire</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Nouveau role</h2>
        <form onSubmit={(e) => {e.preventDefault(); submit()}}>
          <div className={'py-8 custom-form '}>
            <div className={`w-[351px] flex flex-row input-wrapper`}>
              <input
                type={'text'}
                name={'name'}
                placeholder={'Name'}
                {...register('name')}
              />
            </div>
          </div>
          <button className={'btn primary flex justify-end'}>Enregistrer</button>
        </form>
        <div className={'flex justify-end'}>
          <button className={'btn primary'} onClick={closeModal}>Fermer</button>
        </div>
      </Modal>
    </div>
  );
};

export default RolesFormPopup;
