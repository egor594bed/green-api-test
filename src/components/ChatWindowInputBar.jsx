import React, { useState } from 'react'
import MyInput from './UI/MyInput/MyInput'

const ChatWindowInputBar = ({postMessage}) => {
    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(message === '') return
        postMessage(message)
        setMessage('')
    }

    return (
        <div className='chat-window__input-area'>
            <form className='chat-window__input-form' onSubmit={e => submitHandler(e)}>
                <MyInput 
                className='chat-window__input'
                placeholder='Введите сообщение'
                type="text"
                value={message}
                onChange={setMessage}
                ></MyInput>
            </form>
        </div>
    )
}

export default ChatWindowInputBar
