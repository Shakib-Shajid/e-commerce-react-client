import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
        .then(data=>setProducts(data.data))
    }, [])

  
    return (
        <div>
            <h3 className="text-2xl md:text-5xl font-bold text-center my-3 md:my-10">All Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                {
                    products.map(product =>
                        <div className="card card-compact bg-base-100 w-80 shadow-xl" key={product._id}>
                            <figure>
                                <img
                                    src={product.img}
                                    alt={product.name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.desc}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/product/${product._id}`} className="btn btn-primary">Add to Cart</Link>
                                </div>
                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    );
};

export default Product;

