import React from 'react'
import { ReactComponent as ProfileSvg } from '../assets/img/default-profile-svg.svg'

const SideBarContact = ({contactData, setActiveChat}) => {
    return (
        <div className='side-bar__chat-item' onClick={() => setActiveChat(contactData.chatId)}>
            <span className='side-bar__chat-item-img'><ProfileSvg/></span>
            <p className='side-bar__chat-item-contact'>{contactData.contactId}</p>
        </div>
    )
}

export default SideBarContact
