import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addProductBatch, updateProductBatch} from "../../../../services/productBatchService.js";

Modal.setAppElement('#root');
const ProductBatchPopupForm = ({openModal, isModalOpen, closeModal, productBatch, productsBatch, setProductsBatch}) => {


  const validationSchema= yup.object(
    {
      brandName: yup.string(),
      supplier: yup.string(),
      batchStock: yup.number(),
      dateExp: yup.date()
    }
  )

  const initialValues =  {
    brandName: productBatch ? productBatch.brand : '',
    supplier: productBatch ? productBatch.name :  '',
    batchStock: productBatch ? productBatch.quantity : '',
    dateExp: productBatch ? productBatch.dateExp : '',
  }

  const {
    handleSubmit,
    register,
    formState: {isSubmitting, errors}
  } = useForm({defaultValues: initialValues, resolver: yupResolver(validationSchema)});


  const submit = handleSubmit(async(values) => {

    console.log(values);
    if(productBatch)
    {
      await updateProductBatch(productBatch.id, {...productBatch, quantity: values.batchStock, dateExp: values.dateExp});
      setProductsBatch(productsBatch.map(p => p.id === productBatch.id ? {...productBatch, quantity: values.batchStock, id: productBatch.id, dateExp: values.dateExp} : p));
    } else {
      await addProductBatch(values)
      setProductsBatch([...productsBatch, {...values}])
    }

    closeModal();
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
        {productBatch ?
          (<h2>Mise à jour du lot de produit</h2>) : (<h2>Nouveau lot de produit</h2>)
        }
        <form onSubmit={(e) => {e.preventDefault(); submit()}}>
          <div className={'py-8 custom-form '}>
            <div className={`w-[351px] flex flex-row input-wrapper`}>
              <input
                disabled={productBatch}
                type={'text'}
                name={'brandName'}
                {...register('brandName')}
                placeholder={'Name Brand'}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                disabled={productBatch}
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
                placeholder={initialValues.dateExp}
                name={'dateExp'}
                type={'date'}
                {...register('dateExp')}
              />
              {errors.expirationDate ? <p>{errors.expirationDate.message}</p> : ''}
            </div>
          </div>
          <button disabled={isSubmitting} className={'btn primary flex justify-end'}>Enregistrer</button>
        </form>
        <div className={'flex justify-end'}>
          <button className={'btn primary'} onClick={closeModal}>Fermer</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductBatchPopupForm;
