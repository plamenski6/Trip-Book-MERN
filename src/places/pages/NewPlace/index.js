import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../../shared/components/FormElements/Input'
import Button from '../../../shared/components/FormElements/Button'
import ErrorModal from '../../../shared/components/ErrorModal'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'
import { AuthContext } from '../../../shared/context/auth-context'
import { useForm } from '../../../shared/hooks/form-hook'
import { useHttpClient } from '../../../shared/hooks/http-hook'

import './index.css'

const NewPlace = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

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
        },
        image: {
            value: '',
            isValid: false
        }
    }, false)

    const history = useHistory()

    const placeSubmitHandler = async event => {
        event.preventDefault()

        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places', 'POST', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                image: formState.inputs.image.value,
                creator: auth.userId
            }),
                {
                    'Content-Type': 'application/json',
                     Authorization: 'Bearer ' + auth.token
                })
            history.push('/')
        } catch (err) {

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
                <Input
                    id='image'
                    element='input'
                    label='ImageUrl'
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
            </form>
        </React.Fragment>
    )
}

export default NewPlace