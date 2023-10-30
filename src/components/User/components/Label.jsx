import Panel from "../../Panel"
function Label({ classname, children, title, contentClass }) {
    return (
        <Panel className={`bg-base-100 shadow-lg border flex flex-row items-center py-1 px-4 rounded-lg my-2 mx-6 w-fit ${classname}`}>
            <h1 className="text-xl font-h-b my-0.5 mx-2">
                {title} 
            </h1>
            <div className={contentClass}>
                {children}
            </div>
        </Panel>
    )
}

export default Label