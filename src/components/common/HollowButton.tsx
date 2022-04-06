export default (props: {children: React.ReactNode, disabled: boolean, onClick: any}) => {
    return (
        <button onClick={props.onClick} className={`btn btn-sm ${props.disabled && 'btn-outline'} btn-primary`}>
            {props.children}
        </button>
    )
}