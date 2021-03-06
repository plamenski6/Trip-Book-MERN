import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../../shared/components/FormElements/Input'
import Button from '../../../shared/components/FormElements/Button'
import ErrorModal from '../../../shared/components/ErrorModal'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_NUMBER
} from '../../../shared/util/validators'
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
        lat: {
            value: '',
            isValid: false
        },
        lng: {
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
                lat: formState.inputs.lat.value,
                lng: formState.inputs.lng.value,
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
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid title.'
                    onInput={inputHandler}
                />
                <Input
                    id='description'
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Please enter a valid description (at least 5 characters).'
                    onInput={inputHandler}
                />
                <Input
                    id='address'
                    element='input'
                    label='Address'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid address.'
                    onInput={inputHandler}
                />
                <Input
                    id='lat'
                    element='input'
                    label='Latitude'
                    validators={[VALIDATOR_NUMBER()]}
                    errorText='Please enter a valid latitude (only numbers).'
                    onInput={inputHandler}
                />
                <Input
                    id='lng'
                    element='input'
                    label='Longitude'
                    validators={[VALIDATOR_NUMBER()]}
                    errorText='Please enter a valid longitude (only numbers).'
                    onInput={inputHandler}
                />
                <Input
                    id='image'
                    element='input'
                    label='ImageUrl'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid imageUrl (image link).'
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
            </form>
        </React.Fragment>
    )
}

export default NewPlace