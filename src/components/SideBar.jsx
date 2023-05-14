import React from 'react'
import { ReactComponent as ProfileSvg } from '../assets/img/default-profile-svg.svg'
import SideBarContact from './SideBarContact'
import SideBarInputBar from './SideBarInputBar'

const SideBar = ({setActiveChat, newContact, contactArr}) => {

    return (
        <div className='side-bar'>
            <header className='side-bar__header header'>
                <div className='side-bar__header-profile header-profile'>
                <ProfileSvg/>
                </div>
            </header>
            <SideBarInputBar newContact={newContact}></SideBarInputBar>
            <div className='side-bar__chat-list'>
                {contactArr[0] &&
                    contactArr.map((contact) => {
                        return <SideBarContact contactData={contact} setActiveChat={setActiveChat} key={contact.contactId}/>
                    })
                }
            </div>
        </div>
    )
}

export default SideBar
