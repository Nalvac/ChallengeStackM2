import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

Modal.setAppElement('#root');
const TransactionFormPopup = ({openModal, isModalOpen, closeModal}) => {


  const validationSchema= yup.object(
    {
      user: yup.string(),
      quantity: yup.string(),
      deliveryDate: yup.number(),
      batch: yup.number(),
    }
  )

  const initialValues =  {
    user: '',
    quantity: '',
    deliveryDate: '',
    batch: '',
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
      maxHeight: '580px',
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
        <h2>Nouvelle transaction</h2>
        <form onSubmit={(e) => {e.preventDefault(); submit()}}>
          <div className={'py-8 custom-form '}>
            <div className={`w-[351px] flex flex-row input-wrapper`}>
              <input
                type={'text'}
                name={'user'}
                placeholder={'User'}
                {...register('user')}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='number'
                name={'quantity'}
                placeholder='Quantité'
                {...register('quantity')}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='date'
                name={'deliveryDate'}
                placeholder='Delivery Date'
                {...register('deliveryDate')}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='number'
                name={'totalStock'}
                placeholder={'Total stock'}
                {...register('totalStock')}
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

export default TransactionFormPopup;
