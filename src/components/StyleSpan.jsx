/* eslint-disable */
export default function StyleSpan({ children }) {
    return (
        <blockquote className="inline-block text-2xl font-semibold italic text-center text-slate-900">
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                <span className="relative text-white">{children}</span>
            </span>
        </blockquote>
    )
}