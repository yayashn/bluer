export default (props: {children: React.ReactNode, position?: 'start' | 'end' | 'center' | 'evenly', className?: string}) => {
    return (
        <div className={`flex w-full ${'justify-'+props.position || 'justify-center'} ${props.className || ''}`}>
            {props.children}
        </div>
    )
}