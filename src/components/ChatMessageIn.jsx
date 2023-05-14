import React from 'react'
import { ReactComponent as SvgIn } from '../assets/img/tail-in.svg'

const ChatMessageIn = ({messageData}) => {
    return (
        <div className='chat-window__message in-message'>
            <SvgIn></SvgIn>
            <div className='chat-window__message-cloud'>
            <p className='chat-window__message-text'>{messageData}</p>
            </div>
        </div>
    )
}

export default ChatMessageIn
