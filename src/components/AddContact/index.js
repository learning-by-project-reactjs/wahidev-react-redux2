import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContactList, updateContact } from '../../actions/contactAction';

function AddContact() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');

    const { addContactResult, detailContactResult, updateContactResult } = useSelector((state) => state.ContactReducer)
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        if(id) {
            // update
            dispatch(updateContact({id, name, phone}))
        } else  {
            // add
            dispatch(addContact({name, phone}))
        }
    }

    useEffect(() => {
        if (addContactResult) {
            dispatch(getContactList())
            setName('')
            setPhone('')
        }
    }, [addContactResult, dispatch])

    useEffect(() => {
        if (detailContactResult) {
            setName(detailContactResult.name)
            setPhone(detailContactResult.phone)
            setId(detailContactResult.id)
        }
    }, [detailContactResult, dispatch])

    useEffect(() => {
        if (updateContactResult) {
            dispatch(getContactList())
            setName('')
            setPhone('')
            setId(' ')
        }
    }, [updateContactResult, dispatch])

    return (
        <div>
            <h4>
                { id ? "Edit Contact" : "Add Contact"}
            </h4>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input type="text" name="name" placeholder="Name" value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input type="text" name="phone" placeholder="Phone" value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddContact