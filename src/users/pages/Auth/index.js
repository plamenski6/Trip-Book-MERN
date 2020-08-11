import React, { useState, useContext } from 'react'

import Card from '../../../shared/components/Card'
import Input from '../../../shared/components/FormElements/Input'
import Button from '../../../shared/components/FormElements/Button'
import ErrorModal from '../../../shared/components/ErrorModal'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'
import { useForm } from '../../../shared/hooks/form-hook'
import { useHttpClient } from '../../../shared/hooks/http-hook'
import { AuthContext } from '../../../shared/context/auth-context'

import './index.css'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = async (event) => {
        event.preventDefault()

        if (isLoginMode) {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST', JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }), {
                    'Content-Type': 'application/json'
                })

                auth.login(responseData.user.id)
            } catch (err) {

            }
        } else {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/signup', 'POST', JSON.stringify({
                    name: formState.inputs.name.value,
                    image: formState.inputs.image.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }), {
                    'Content-Type': 'application/json'
                })

                auth.login(responseData.user.id)
            } catch (err) {

            }
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode &&
                        <>
                            <Input
                                id='name'
                                element='input'
                                type='text'
                                label='Your Name'
                                onInput={inputHandler}
                            />
                            <Input
                                id='image'
                                element='input'
                                label='Avata (imageUrl)'
                                onInput={inputHandler}
                            />
                        </>
                    }
                    <Input
                        id='email'
                        element='input'
                        type='email'
                        label='E-mail'
                        onInput={inputHandler}
                    />
                    <Input
                        id='password'
                        element='input'
                        type='password'
                        label='Password'
                        onInput={inputHandler}
                    />
                    <Button type='submit' disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth