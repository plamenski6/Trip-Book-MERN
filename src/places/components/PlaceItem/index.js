import React, { useState } from 'react'

import Modal from '../../../shared/components/Modal'
import Card from '../../../shared/components/Card'
import Button from '../../../shared/components/FormElements/Button'

import './index.css'

const PlaceItem = props => {
    const [showConfirmModal, setConfirmModal] = useState(false)

    const showDeleteWarningHandler = () => {
        setConfirmModal(true)
    }

    const cancelDeleteHanler = () => {
        setConfirmModal(false)
    }

    const confirmDeleteHandler = () => {
        setConfirmModal(false)
        console.log('DELETING...')
    }

    return (
        <React.Fragment>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHanler}
                header='Are you sure?'
                footerClass='place-item__modal-actions'
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHanler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }>
                <p>
                    Do you want to proceed and delete this place?
                    Please note that it can't be undone thereafter.
                </p>
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse>VIEW ON MAP</Button>
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem