import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addTransactions, updateTransactions} from "../../../../services/transactions.js";

Modal.setAppElement('#root');
const TransactionFormPopup = ({openModal, isModalOpen, closeModal, transactionValue}) => {


  const validationSchema= yup.object(
    {
      user: yup.string(),
      quantity: yup.string(),
      deliveryDate: yup.date(),
      productBatch: yup.string(),
    }
  )

  let date;

  if(transactionValue)
  {
    date = new Date(transactionValue.deliveryDate);
  }

  const initialValues =  {
    user: transactionValue ? transactionValue.user : '',
    quantity: transactionValue ? transactionValue.quantity : '',
    deliveryDate: transactionValue ? date : '',
    productBatch: transactionValue ? transactionValue.productBatch : '',
  }

  console.log(date);

  const {
    handleSubmit,
    register,
  } = useForm({defaultValues: initialValues, resolver: yupResolver(validationSchema)});

  const submit = handleSubmit(async(values) => {
    let date = new Date(values.deliveryDate);
    if(transactionValue)
    {
      await updateTransactions(values.quantity, date.toISOString(), values.productBatch, values.user, transactionValue.transactionId);
      console.log('yes')
    } else {
      await addTransactions(values.quantity, date.toISOString(), values.productBatch, values.user);
      console.log('kk')
    }
    // console.log(date.toISOString());
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
                type='text'
                name={'productBatch'}
                placeholder={'Product Batch'}
                {...register('productBatch')}
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
