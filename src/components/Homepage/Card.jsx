/*eslint-disable */
import Button from "../Button";
import { Link } from "react-router-dom";

export default function Card({ title, desc, image }) {
  return (
    <div className="card h-56 bg-base-100 shadow-xl image-full mx-2">
      <figure className="w-full h-full">
        <img className="object-cover w-full h-full" src={image} alt={title} />
      </figure>
      <div className="card-body h-56">
        <h2 className="card-title text-2xl font-h text-white underline">{title}</h2>
        <p className="font-t">{desc}</p>
        <div className="card-actions justify-end">
          <div className="flex items-center justify-center">
            <Link to='/products'>
              <Button>Buy Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
