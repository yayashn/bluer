export default (props: {className?: string, username: string}) => {
    return (
        <div className={`avatar placeholder ${props.className || ''}`}>
            <div className="w-14 rounded-full bg-secondary">
                <span className="text-3xl">{props.username.split('')[0]}</span>
            </div>
        </div>
    )
}