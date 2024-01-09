import styles from './Signup.module.scss';
import logo from '../../assets/images/logo.png';
import logo_img from "../../assets/images/img_login.png";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from 'react-hook-form'
export default function Signup() {

  const validationSchema = yup.object({
    name: yup.string().required('Entre un nom'),
    mail: yup.string().required('Il faut préciser votre email').email('L\'email n\'est pas valide'),
    phone: yup.string(),
    zipCode: yup.string(),
    city: yup.string().required('Entre une ville'),
    address: yup.string().required('Entrer une adresse complete'),
    password: yup.string().required('Mot de passe requis').min(4, 'Mot de passe trop court'),
  });


  const defaultValue = {
    name: '',
    mail: '',
    phone: '',
    zipCode: '',
    city: '',
    address: '',
    password: '',
  }

  const {
    handleSubmit,
    formState: {errors, isSubmitting },
    register,
    reset,
    setError,
    clearErrors,
  } = useForm({defaultValues: defaultValue, resolver: yupResolver(validationSchema)})


  const submit = handleSubmit(async (user) => {
    console.log(user);
  })

  return (
    <form onSubmit={submit}>
      <div className={'relative'}>
        <div className={'absolute top-5 left-5 w-28'}>
          <img alt={'CCAM Logo'} src={logo}/>
        </div>
        <div className={`relative flex flex-row h-screen`}>
          <div className={`flex flex-col w-2/5 items-center justify-center`}>
            <div className={`w-[630px] flex flex-col items-center justify-center py-2 ${styles.signupContainer}`}>
              <div className={styles.title}>
                <h1 className={'text-primary'}>Inscription</h1>
              </div>
              <div className={'py-8'}>
                <div className={`w-[500px] flex flex-row border-primary p-2 ${styles.inputWrapper}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                       stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                  </svg>
                  <input placeholder={'Nom'} name={'name'} {...register('name')}/>
                </div>
                {errors.name && <p className='form-error'>{errors.name.message}</p>}

                <div className={'w-[500px] flex justify-between'}>
                  <div className={`w-[240px] flex flex-row my-5 ${styles.inputWrapper}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                    </svg>
                    <input placeholder={'Email'} name={'mail'} {...register('mail')}/>
                  </div>

                  <div className={`w-[240px] flex flex-row my-5 ${styles.inputWrapper}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.500-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <input placeholder={'Téléphone'} name={'phone'} {...register('phone')}/>
                  </div>

                </div>


                <div className={'w-[500px] flex justify-between'}>
                  <div className={`w-[240px] flex flex-row ${styles.inputWrapper}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <input placeholder={'Code postal'} name={'zipCode'} {...register('zipCode')}/>
                  </div>
                  {errors.zipCode && <p className='form-error'>{errors.zipCode.message}</p>}

                  <div className={`w-[240px] flex flex-row ${styles.inputWrapper}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <input placeholder={'Ville'} name={'city'} {...register('city')}/>
                  </div>
                  {errors.city && <p className='form-error'>{errors.city.message}</p>}

                </div>


                <div className={`w-[500px] flex flex-row my-5 ${styles.inputWrapper}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <input placeholder={'Adresse'} name={'address'} {...register('address')}/>
                </div>
                {errors.address && <p className='form-error'>{errors.address.message}</p>}

                <div className={`w-[500px] flex flex-row my-5 ${styles.inputWrapper}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                  </svg>
                  <input type={'password'} placeholder={'Mot de passe'} name={'password'} {...register('password')}/>
                </div>
                {errors.password && <p className='form-error'>{errors.password.message}</p>}

              </div>
              <button
                disabled={isSubmitting}
                className="btn reverse">
                Enregistrer
              </button>
            </div>
          </div>
          <div className={'w-3/5'}>
            <img alt={'Image of doctor'} src={logo_img} className={'h-full w-full max-w-100 object-cover '}/>
          </div>
        </div>
      </div>
    </form>
  )
}
