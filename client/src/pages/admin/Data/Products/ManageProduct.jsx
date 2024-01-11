import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

Modal.setAppElement('#root');
const ProductPopupForm = ({openModal, isModalOpen, closeModal}) => {


  const validationSchema= yup.object(
    {
      name: yup.string(),
      brand: yup.string(),
      alertStock: yup.number(),
      totalStock: yup.number(),
      type: yup.string(),
    }
  )

  const initialValues =  {
    name: '',
    brand: '',
    alertStock: '',
    totalStock: '',
    type: 'NORMAL',
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
      maxHeight: '650px',
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
        <h2>Nouveau produit</h2>
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
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='text'
                name={'brand'}
                placeholder='Brand'
                {...register('brand')}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='number'
                name={'alertStock'}
                placeholder='Alert Stock'
                {...register('alertStock')}
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
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <select value={'NORMAL'} name={'type'} {...register('type')}>
                <option value={'ARN'}>ARN</option>
                <option value={'NORMAL'}>NORMAL</option>
              </select>
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

export default ProductPopupForm;
