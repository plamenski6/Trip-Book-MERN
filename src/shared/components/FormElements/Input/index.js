import React, { useState, useEffect } from 'react'

import './index.css'

// const inputReducer = (state, action) => {
//     switch (action.type) {
//         case 'CHANGE':
//             return {
//                 ...state,
//                 value: action.val,
//                 isValid: validate(action.val, action.validators)
//             };
//         default:
//             return state;
//     }
// }

const Input = props => {
    // const [inputState, dispatch] = useReducer(inputReducer, { value: '', isValid: false })
    const [enteredValue, setEnteredValue] = useState(props.initialValue || '')
    const [isValid, setIsValid] = useState(props.initialValid || false)

    const {id, onInput} = props
    useEffect(() => {
        onInput(id, enteredValue, isValid)
    }, [id, enteredValue, isValid, onInput])

    const changeHandler = event => {
        // dispatch({
        //     type: 'CHANGE',
        //     val: event.target.value,
        //     validators: props.validators
        // })
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