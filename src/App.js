import React from 'react'
import { ContactList, AddContact } from './components'

const App = () => {
  return (
    <div style={{ padding: '30px'}}>
      <h2>Contact App</h2>
      <hr />
      <AddContact />
      <hr />
      <ContactList />
    </div>
  )
}

export default App