import React, { useState, useEffect } from 'react'

import './index.css'

const Input = props => {
    const [enteredValue, setEnteredValue] = useState(props.initialValue || '')
    const [isValid, setIsValid] = useState(props.initialValid || false)

    const {id, onInput} = props
    useEffect(() => {
        onInput(id, enteredValue, isValid)
    }, [id, enteredValue, isValid, onInput])

    const changeHandler = event => {
        setEnteredValue(event.target.value)
        setIsValid(true)
    }

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={enteredValue} />
    ) : (
            <textarea
                id={props.id}
                rows={props.row || 3}
                onChange={changeHandler}
                value={enteredValue} />
        )

    return (
        <div className={'form-control'}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    )
}

export default Input