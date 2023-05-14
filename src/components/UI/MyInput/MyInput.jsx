import React, { memo } from 'react'

const MyInput = memo(({onChange, ...props}) => {

    return (
        <input
        onChange={e => onChange(e.target.value)}
        {...props}>
        </input>
    )
})

export default MyInput
