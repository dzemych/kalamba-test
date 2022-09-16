import {FC, useContext, useEffect, useState} from 'react'
import useHttp from "../hooks/useHttp";
import {Link, useHistory} from "react-router-dom";
import UserContext from "../context/UserContext";


interface IFormError {
   email?: string,
   password?: string
}

const LoginRegister: FC = () => {

   // * For big app implement useForms hook to separate form logic and validation and make it reusable

   const { request, error: serverError } = useHttp()
   const { login } = useContext(UserContext)

   const history = useHistory()

   const [forms, setForms] = useState({
      password: '',
      email: ''
   })
   const [formsError, setFormsError] = useState<IFormError>({})

   const [credentialsError, setCredentialsError] = useState('')

   const setAndGetError = () => {
      const newError: IFormError = {}

      if (forms.email.length < 2)
         newError.email = 'Invalid email'

      if (forms.password.length < 5)
         newError.password = 'Minimum password length - 5 symbols'

      setFormsError(newError)
      setCredentialsError('')

      return Object.keys(newError).length
   }

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      setForms(prev => ({...prev, [key]: e.target.value}))
   }

   const submitHandler = async (e: React.SyntheticEvent) => {
      e.preventDefault()

      const error = setAndGetError()

      if (!error) {
         const response = await request(
            '/users/login',
            'POST',
            JSON.stringify({ user: forms }),
            {'content-type': 'application/json'}
         )

         if (response) {
            const { email, token, username } = response.user

            login(email, token, username)
            history.push('/')
         }
      }
   }

   useEffect(() => {
      // Realise here better error handling
      if (serverError) {
         setCredentialsError('Invalid email or password')
      }

   }, [serverError])

   return (
      <>
         <div className="auth-page">
            <div className="container page">
               <div className="row">
                  <div className="col-md-6 offset-md-3 col-xs-12">
                     <h1 className="text-xs-center">Sign in</h1>

                     <p className="text-xs-center">
                        <Link to={'/register'}>
                           New user ?
                        </Link>
                     </p>

                     {credentialsError &&
                        <ul className="error-messages">
                           <li>Invalid email or password</li>
                        </ul>
                     }

                     <form>
                        <fieldset className="form-group">
                           <input
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Your Email"
                              onChange={e => changeHandler(e, 'email')}
                           />

                           {formsError.email &&
                              <span style={{
                                 color: '#b85c5c',
                                 marginLeft: 8
                              }}>
                                 {formsError.email}
                              </span>
                           }
                        </fieldset>

                        <fieldset className="form-group">
                           <input
                              className="form-control form-control-lg"
                              type="password"
                              placeholder="Password"
                              onChange={e => changeHandler(e, 'password')}
                           />

                           {formsError.password &&
                              <span style={{
                                 color: '#b85c5c',
                                 marginLeft: 8
                              }}>
                                 {formsError.password}
                              </span>
                           }
                        </fieldset>

                        <button
                           className="btn btn-lg btn-primary pull-xs-right"
                           onClick={submitHandler}
                        >
                           Sign in
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default LoginRegister