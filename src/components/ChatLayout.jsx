import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import ChatWindow from './ChatWindow'
import { Chat } from '../services/chat-contact-service'
import Auth from './Auth'

const ChatLayout = () => {
    const [IdInstance, setIdInstance] = useState(false)
    const [apiTokenInstance, setApiTokenInstance] = useState(false)
    const [activeChat, setActiveChat] = useState('')
    const [contactArr, setContactArr] = useState([])

    useEffect(() => {
        const getNewMessages = async () => {
            let time = 3000
            try {
                await fetch(`https://api.green-api.com/waInstance${IdInstance}/ReceiveNotification/${apiTokenInstance}`, {
                    method: 'GET',
                })
                .then((res) => res.json())
                .then(async(receipt) => {
                    if(receipt !== null) {
                        await newMessage(receipt.body.senderData.sender.split("@")[0], {type: "in", textMessage: receipt.body.messageData.textMessageData.textMessage})
                    }
                    return receipt
                })
                .then(async (receipt) => {
                    if(receipt !== null) {
                        return await deleteNotification(receipt.receiptId)
                    }
                })
                .then((res) => res.json())
                .then((status) => {
                    if(status.result) {
                        time = 0
                    }
                })
            } catch (error) {
    
            } finally {
                setTimeout(() => {
                    return getNewMessages()
                }, time)
            }
        }

        if(IdInstance && apiTokenInstance) {
            getNewMessages()
        }
    }, [IdInstance, apiTokenInstance])


    const deleteNotification = (receiptId) => {
        let res
        try {
            res = fetch(`https://api.green-api.com/waInstance${IdInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`, {
                    method: 'DELETE',
            })
        } catch (error) {
        }
        return res
    }

    const newContact = (contactId) => {
        let contact = contactArr.find((contact) => {
            if(contact.contactId === contactId) {
                return true
            }
        })
        if(contact) return
        setContactArr([...contactArr, new Chat(contactId)])
    }

    const newMessage = (contactId, message) => {
        setContactArr(prev => {
            let chat = prev.find((chat) => {
                if(chat.contactId === contactId) {
                    chat.addMessage(message)
                    return true
                }
            })

            if(!chat) {
                let newChat = new Chat(contactId)
                newChat.addMessage(message)
                return [...prev, newChat]
            } else {
                return [...prev]
            }
        })
    }

    const successAuth = (IdInstance, apiTokenInstance) => {
        setIdInstance(IdInstance)
        setApiTokenInstance(apiTokenInstance)
    }

    if(!IdInstance && !apiTokenInstance) {
        return <Auth successAuth={successAuth}></Auth>
    }

    return (
        <>
        <SideBar setActiveChat={setActiveChat} newContact={newContact} contactArr={contactArr}></SideBar>
        {(activeChat !== '')
            ?
            contactArr.map((chat) => {
                if(activeChat === chat.chatId) {
                    return (
                        <ChatWindow
                        userData={{IdInstance, apiTokenInstance}}
                        chatData={chat}
                        newMessage={newMessage}
                        key={chat.chatId}
                        ></ChatWindow>
                    )
                }
            })
            :
            <p style={{backgroundColor: "green", display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: 'white', fontSize: '32px'}}>Заглушка</p>
        }
        </>
    )
}

export default ChatLayout

