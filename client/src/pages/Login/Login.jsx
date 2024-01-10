import styles from './Login.module.scss';
import logo from '../../assets/images/logo.png';
import logo_img from "../../assets/images/img_login.png";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
export default function Login() {

  const validationSchema= yup.object(
    {
      email: yup.string().required('Email requis').email("L'email n'est pas valide"),
      password: yup.string().required('Mot de passe requis').min(4, 'Mot de passe trop court'),
    }
  )

  const initialValues =  {
    email: '',
    password: '',
  }

  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm({defaultValues: initialValues, resolver: yupResolver(validationSchema)});


  const submit = handleSubmit(async(credentials) => {
    console.log(credentials);
  })


  return (
    <form onSubmit={submit}>
      <div className={'relative'}>
        <div className={'absolute top-5 left-5 w-28'}>
          <img alt={'CCAM Logo'} src={logo}/>
        </div>
        <div className={`flex flex-row h-screen `}>
          <div className={`flex flex-col w-2/5 items-center justify-center`}>
            <div className={`h-[400px] w-[430px] flex flex-col items-center justify-center  ${styles.loginContainer}`}>
              <div className={styles.title}>
                <h1 className={'text-primary'}>Connexion</h1>
              </div>
              <div className={'py-8 custom-form '}>
                <div className={`w-[351px] flex flex-row input-wrapper`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                       stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                  </svg>
                  <input
                    type={'text'}
                    placeholder={errors.email ? `${errors.email.message}`: 'Adresse email'}
                    className={errors.email ? 'field-error' : null}
                    name='email' {...register('email')}
                  />
                </div>
                <div className={`w-[351px] flex flex-row my-5 input-wrapper`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <input
                    placeholder={errors.password ? `${errors.password.message}`: 'Mot de passe'}
                    className={errors.password ? 'field-error' : null}
                    type='password' name='password'
                    {...register('password')}
                  />
                </div>
              </div>
              <button disabled={isSubmitting} className="btn primary outlined">
                Connexion
              </button>
              <a></a>
            </div>
          </div>
          <div className={'w-3/5'}>
            <img alt={'Image of a doctor'} src={logo_img} className={'h-full w-full max-w-100 object-cover '}/>
          </div>
        </div>
      </div>
    </form>
  )
}
