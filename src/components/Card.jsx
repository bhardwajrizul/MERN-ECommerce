/*eslint-disable */
import Button from "./Button";

export default function Card({ title, desc, image }) {
  return (
    <div className="card h-56 bg-base-100 shadow-xl image-full mx-2">
      <figure className="w-full h-full">
        <img className="object-cover w-full h-full" src={image} alt={title} />
      </figure>
      <div className="card-body h-56">
        <h2 className="card-title text-2xl font-h underline">{title}</h2>
        <p className="font-t">{desc}</p>
        <div className="card-actions justify-end">
          <Button>Buy Now</Button>
        </div>
      </div>
    </div>
  );
}
