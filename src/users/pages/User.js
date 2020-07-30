import React from 'react'

import UserList from '../components/UserList'

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Max',
            image: 'https://images.theconversation.com/files/81618/original/image-20150514-28626-5j5514.JPG?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
            places: 3
        }
    ]

    return (
        <UserList items={USERS} />
    )
}

export default Users