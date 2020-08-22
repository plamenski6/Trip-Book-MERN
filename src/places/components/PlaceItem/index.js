import React, { useState, useContext } from 'react'

import Modal from '../../../shared/components/Modal'
import Card from '../../../shared/components/Card'
import Button from '../../../shared/components/FormElements/Button'
import Map from '../../../shared/components/Map'
import ErrorModal from '../../../shared/components/ErrorModal'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'
import { AuthContext } from '../../../shared/context/auth-context'
import { useHttpClient } from '../../../shared/hooks/http-hook'

import './index.css'

const PlaceItem = props => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false)

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setConfirmModal(true)
    }

    const cancelDeleteHanler = () => {
        setConfirmModal(false)
    }

    const confirmDeleteHandler = async () => {
        setConfirmModal(false)

        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, 'DELETE', null, {
                Authorization: 'Bearer ' + auth.token
            })
            props.onDelete(props.id)
        } catch (err) {

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className='map-container'>
                    <Map lng={props.lng} lat={props.lat} zoom={16} />
                </div>
            </Modal>
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
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className='place-item__image'>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMapHandler}>
                            VIEW ON MAP
                          </Button>
                        {auth.userId === props.creatorId && (
                            <>
                                <Button to={`/places/${props.id}`}>EDIT</Button>
                                <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem