import React from 'react'
import { ReactComponent as SvgOut } from '../assets/img/tail-out.svg'

const ChatMessageOut = ({messageData}) => {
    return (
        <div className='chat-window__message out-message'>
            <div className='chat-window__message-cloud'>
            <p className='chat-window__message-text'>{messageData}</p>
            </div>
            <SvgOut></SvgOut>
        </div>
    )
}

export default ChatMessageOut
