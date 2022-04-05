import { useState } from "react"
import styled from "styled-components"

export default (props: {title: string, placeholder: string, type: string, input: (i: any) => any}) => {
    const [input, setInput] = useState('');

    props.input(input);

    return (
        <div className='form-control mb-5'>
            <label className="input-group">
                <Title>{props.title}</Title>
                <input onChange={(e) => {
                    setInput(e.currentTarget.value + `${props.title == 'Username' && '@bluer.com'}`)
                }} type={props.type} placeholder={props.placeholder} className="input input-bordered focus:outline-none focus:border-primary"/>
            </label>
        </div>
    )
}

const Title = styled.span`
    min-width: 110px;
    max-width: 110px;
`