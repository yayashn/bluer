export default (props: {children: React.ReactNode, disabled: boolean}) => {
    return (
        <button className={`btn btn-sm ${props.disabled && 'btn-outline'} btn-primary`}>
            {props.children}
        </button>
    )
}