import styled from "styled-components"

export default (props: {children?: React.ReactNode, className: string, type: string}) => {
    return (
        <Alert className={`alert ${props.type || 'alert-error'} ${props.className || ''} ${!props.children && 'invisible'}`}>
            <div>
                {props.type == 'alert-success' 
                ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                <span>{props.children}</span>
            </div>
        </Alert>
    )
}

const Alert = styled.div`
    min-width: 358px;
    max-width: 358px;
    align-items: start !important;
`