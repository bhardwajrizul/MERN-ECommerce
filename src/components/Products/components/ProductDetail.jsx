export function ProductDetail({ children }) {
    return (
        <div className="w-fill p-2 bg-base-100 rounded-lg me-4 my-2">
            <h2 className="inline-block font-t-b">{children}</h2>
        </div>
    )
}