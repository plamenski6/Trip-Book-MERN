import React, { useState, useEffect } from 'react'

import UserList from '../components/UserList'
import ErrorModal from '../../shared/components/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users')
                const results = responseData.users.filter(function (user) {
                    return user.name.toLowerCase().includes(searchTerm)
                })
                setSearchResults(results)
            } catch (err) {

            }
        }
        fetchUsers()
    }, [sendRequest, setSearchResults, searchTerm])

    const handleChange = event => {
        setSearchTerm(event.target.value)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (<div className='center'>
                <LoadingSpinner />
            </div>)}
            <div className='center'>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            {!isLoading && searchResults && <UserList items={searchResults} />}
        </React.Fragment>
    )
}

export default Users