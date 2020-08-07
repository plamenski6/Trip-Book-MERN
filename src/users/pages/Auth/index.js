import React, { useState, useContext } from 'react'

import Card from '../../../shared/components/Card'
import Input from '../../../shared/components/FormElements/Input'
import Button from '../../../shared/components/FormElements/Button'
import { useForm } from '../../../shared/hooks/form-hook'
import { AuthContext } from '../../../shared/context/auth-context' 

import './index.css'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)

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
        if(!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = (event) => {
        event.preventDefault()

        console.log(formState.inputs)
        auth.login()
    }

    return (
        <Card className='authentication'>
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode &&
                    <Input
                        id='name'
                        element='input'
                        type='text'
                        label='Your Name'
                        onInput={inputHandler}
                    />}
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
    )
}

export default Auth