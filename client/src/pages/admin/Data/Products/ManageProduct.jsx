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
      stockAlert: yup.number(),
      totalStock: yup.number(),
      vaccinType: yup.string(),
    }
  )

  const initialValues =  {
    name: product ? product.name : '',
    brand: product ? product.brand : '',
    stockAlert: product ? product.stockAlert :'',
    totalStock: product ? product.stockAlert :'',
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
                name={'stockAlert'}
                placeholder='Alert Stock'
                {...register('stockAlert')}
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
              <select name={'type'} {...register('vaccinType')}>
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
