import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

Modal.setAppElement('#root');
const ProductBatchPopupForm = ({openModal, isModalOpen, closeModal}) => {


  const validationSchema= yup.object(
    {
      brandName: yup.string(),
      supplier: yup.string(),
      batchStock: yup.number(),
      expirationDate: yup.date(),
    }
  )

  const initialValues =  {
    brandName: '',
    supplier: '',
    batchStock: '',
    expirationDate: '',
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
      maxHeight: '570px',
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
        <h2>Nouveau lot de produit</h2>
        <form onSubmit={submit}>
          <div className={'py-8 custom-form '}>
            <div className={`w-[351px] flex flex-row input-wrapper`}>
              <input
                type={'text'}
                name={'brandName'}
                {...register('brandName')}
                placeholder={'Name Brand'}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='text'
                name={'supplier'}
                {...register('supplier')}
                placeholder='Nom du fournisseur'
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='number'
                name={'batchStock'}
                {...register('batchStock')}
                placeholder='Batch stock'
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='date'
                name={'expirationDate'}
                {...register('expirationDate')}
                placeholder={'Date d\'expiration stock'}
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

export default ProductBatchPopupForm;
