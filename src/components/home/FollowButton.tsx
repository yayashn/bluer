import React from "react"

export default (props: {children: React.ReactNode, extra?: boolean, onClick: ()=>any}) => {
    return (
        <div className="btn-group w-full justify-center my-5">
            <button onClick={props.onClick} className="btn btn-accent btn-sm">{props.children}</button> 
            {props.extra && <button aria-label="button component" className="btn btn-accent btn-square btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </button>}
        </div>
    )
}