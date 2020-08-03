import React from 'react'

import Input from '../../../shared/components/FormElements/Input'
import Button from '../../../shared/components/FormElements/Button'
import { useForm } from '../../../shared/hooks/form-hook'

import './index.css'

const NewPlace = () => {

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false)

    const placeSubmitHandler = event => {
        event.preventDefault()

        console.log(formState.inputs) // send this to the backend
    }

    return (
        <form className='place-form' onSubmit={placeSubmitHandler}>
            <Input
                id='title'
                element='input'
                type='text'
                label='Title'
                onInput={inputHandler}
            />
            <Input
                id='description'
                label='Description'
                onInput={inputHandler}
            />
            <Input
                id='address'
                element='input'
                label='Address'
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    )
}

export default NewPlace