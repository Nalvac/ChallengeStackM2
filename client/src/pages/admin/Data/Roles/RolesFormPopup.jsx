import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addRole, updateRole} from "../../../../services/roles.js";

Modal.setAppElement('#root');
const RolesFormPopup = ({openModal, isModalOpen, closeModal, existingValue, roleId}) => {

  const validationSchema= yup.object(
    {
      name: yup.string(),
    }
  )

  const initialValues =  {
    name: existingValue,
  }

  const {
    handleSubmit,
    register,
  } = useForm({defaultValues: initialValues, resolver: yupResolver(validationSchema)});

  const submit = handleSubmit(async(values) => {
    let response;

    if(existingValue && roleId)
    {
      response = await updateRole(values.name, roleId);
    } else {
      response = await addRole(values.name);
    }

    if(response && response.status === 201 || response.status === 200)
    {
      window.location.reload();
    }
    closeModal();
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
