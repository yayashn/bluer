export default (props: {className?: string}) => {
    return (
        <div className={`avatar placeholder ${props.className || ''}`}>
            <div className="w-14 rounded-full bg-secondary">
                <span className="text-3xl">U</span>
            </div>
        </div>
    )
}