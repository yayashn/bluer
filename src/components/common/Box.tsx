export default (props: { children: React.ReactNode; className?: string; }) => {
    return (
        <div className={`relative flex flex-col bg-base-100 w-full h-auto rounded-box shadow-md ${props.className || ''}`}>
            {props.children}
        </div>
    );
};
