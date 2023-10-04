

export default function ProductCard({image, name, description, categories}) {
    return (
        <div className="card sm:w-96 w-36 bg-white shadow-xl mx-2 my-6">
            <figure className="bg-cover p-2">
                <img className="w-full h-full rounded-lg border-2 border" src={image} alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    {categories.map((category) => <div className="badge badge-outline">{category}</div>)}
                    
                </div>
            </div>
        </div>
    )
}