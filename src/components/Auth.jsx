import React, { useState } from 'react'
import MyInput from './UI/MyInput/MyInput'

const Auth = ({successAuth}) => {
    const [IdInstance, setIdInstance] = useState('')
    const [apiTokenInstance, setApiTokenInstance] = useState('')

    const authHendler = async (e) => {
        e.preventDefault()
        let state = await checkValid()
        if(state === 'authorized') {
            successAuth(IdInstance, apiTokenInstance)
        }
        setIdInstance('')
        setApiTokenInstance('')
    }

    const checkValid = async () => {
        let state
        try {
            await fetch(`https://api.green-api.com/waInstance${IdInstance}/getStateInstance/${apiTokenInstance}`, {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((json) => state = json.stateInstance)
            
        } catch (error) {

        }

        return state
    }

    return (
        <div className='auth'>
            <form className='auth__window' onSubmit={e => authHendler(e)}>
                <MyInput
                className="auth__input"
                value={IdInstance}
                placeholder="IdInstance"
                onChange={setIdInstance}/>
                <MyInput
                className="auth__input"
                value={apiTokenInstance}
                placeholder="apiTokenInstance"
                onChange={setApiTokenInstance}/>
                <button className='auth__button' type='submit'>Авторизоваться</button>
            </form>
        </div>
    )
}

export default Auth
