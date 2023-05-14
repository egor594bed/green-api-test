import React from 'react'
import { ReactComponent as ProfileSvg } from '../assets/img/default-profile-svg.svg'
import ChatMessageOut from './ChatMessageOut'
import ChatMessageIn from './ChatMessageIn'
import ChatWindowInputBar from './ChatWindowInputBar'

const ChatWindow = ({userData, chatData, newMessage}) => {
    
    const postMessage = (message) => {
        newMessage(chatData.contactId, {type: "outgoing", textMessage: message})
        try {
            fetch(`https://api.green-api.com/waInstance${userData.IdInstance}/SendMessage/${userData.apiTokenInstance}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    chatId: `${chatData.contactId}@c.us`,
                    message: message
                })
            })
        } catch (error) {}
    }

    return (
        <div className='chat-window'>
            <header className='chat-window__header header'>
                <div className='chat-window__header-profile header-profile'>
                    <ProfileSvg/>
                </div>
                <p className='chat-window__header-profile-contact'>{chatData.contactId}</p>
            </header>
            <div className='chat-window__message-window'>
                <div className='chat-window__message-window-wrapper'>
                    {chatData.messagesArr[0] && 
                        chatData.messagesArr.map((messageObj, i) => {
                            if(messageObj.type === "outgoing") {
                                return <ChatMessageOut messageData={messageObj.textMessage} key={i}></ChatMessageOut>
                            } else {
                                return <ChatMessageIn messageData={messageObj.textMessage} key={i}></ChatMessageIn>
                            }
                        })
                    }
                </div>

            </div>
            <ChatWindowInputBar postMessage={postMessage}></ChatWindowInputBar>
        </div>
    )
}

export default ChatWindow
