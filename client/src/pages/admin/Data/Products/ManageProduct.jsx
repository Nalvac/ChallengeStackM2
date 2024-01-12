import Modal from 'react-modal';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addProduct, updateProduct} from "../../../../services/productService.js";
import {useEffect} from "react";

Modal.setAppElement('#root');
const ProductPopupForm = ({openModal, isModalOpen, closeModal, product, products, setProducts}) => {


  const validationSchema= yup.object(
    {
      name: yup.string(),
      brand: yup.string(),
      stock_alert: yup.number(),
      stockTotal: yup.number(),
      vaccinType: yup.string(),
    }
  )

  const initialValues =  {
    name: product ? product.name : '',
    brand: product ? product.brand : '',
    stock_alert: product ? product.stock_alert :'',
    stockTotal: product ? product.stockTotal :'',
    vaccinType: product ? product.vaccinType : '',
  }

  useEffect(()=> {

  }, [products])


  const {
    handleSubmit,
    register,
    formState: {isSubmitting}
  } = useForm({defaultValues: initialValues, resolver: yupResolver(validationSchema)});


  const submit = handleSubmit(async(values) => {

    if(product)
    {
      console.log(values);
      await updateProduct(product.id, {...values});
      setProducts(products.map((p) => p.id === product.id ? {...values, id: product.id} : p));
    } else {

      await addProduct(values)
      setProducts([...products, {...values, id: products[products.length -1].id + 1}])
    }

    closeModal();
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
        {product ?
          (<h2>Mise à jour du produit</h2>) : (<h2>Nouveau produit</h2>)
        }
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
                name={'stock_alert'}
                placeholder='Alert Stock'
                {...register('stock_alert')}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <input
                type='number'
                name={'stockTotal'}
                placeholder={'Total stock'}
                {...register('stockTotal')}
              />
            </div>
            <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
              <select  name={'type'} {...register('vaccinType')}>
                <option value={'ARN'}>ARN</option>
                <option value={'NORMAL'}>NORMAL</option>
              </select>
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

export default ProductPopupForm;
