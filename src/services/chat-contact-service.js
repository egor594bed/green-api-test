export class Chat {
    chatId = Date.now()
    contactId
    messagesArr = []

    constructor(contactId) {
        this.contactId = contactId
    }

    addMessage(message) {
        this.messagesArr.push(message)
    }
}