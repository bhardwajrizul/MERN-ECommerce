import classNames from "classnames"
import { twMerge } from "tailwind-merge"

/*eslint-disable*/
export default function Button({children, dark, className ,...rest}) {
    let classes = classNames(
        "text-sm", "text-white", "rounded", "btn", "btn-outline", "btn-default" ,
        "hover:bg-white" , "hover:text-black", className,
        {
            "text-black": dark,
            "hover:bg-black": dark,
            "hover:text-white": dark
        }
    )
    let finalClasses = twMerge(classes);
    return (
        <button className={finalClasses}  {...rest} >
            {children}
        </button>
    )
}