import React, { useState } from 'react'
import MyInput from './UI/MyInput/MyInput'

const SideBarInputBar = ({newContact}) => {
    const [contactId, setContactId] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(contactId === '') return
        newContact(contactId)
        setContactId('')
    }

    return (
        <form className='side-bar__new-chat' onSubmit={(e) => submitHandler(e)}>
            <div className='side-bar__new-chat-wrapper'>
                <MyInput
                className='side-bar__new-chat-input'
                placeholder='Введите номер телефона'
                value={contactId}
                onChange={setContactId}/>
            </div>
            <button className='side-bar__new-chat-button' type='submit'>+</button>
        </form>
    )
}

export default SideBarInputBar
