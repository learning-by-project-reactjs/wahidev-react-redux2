import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContact, detailContact, getContactList } from '../../actions/contactAction'

const ContactList = () => {
    const { 
      getContactListResult, 
      getContactListLoading, 
      getContactListError,
      deleteContactResult, 
    } = useSelector((state) => state.ContactReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        // get contact list
        dispatch(getContactList())
    }, [dispatch])

    useEffect(() => {
      if (deleteContactResult) {
        dispatch(getContactList())
      }
    }, [deleteContactResult, dispatch])

  return (
    <div>
        <h4>Contact List</h4>
        {
          getContactListResult ? (
            getContactListResult.map((contact) => {
              return (
                <p key={contact.id}>
                  {contact.name} - {contact.phone}
                  <button
                    style={{ margin: '0 10px' }}
                    onClick={() => dispatch(detailContact(contact))}
                  >Edit</button>
                  <button onClick={ () => dispatch(deleteContact(contact.id))}>Delete</button>
                </p>
              )
            })
          ) : getContactListLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getContactListError ? getContactListError : "No Data!"}</p>
          )
        }
    </div>
  )
}

export default ContactList