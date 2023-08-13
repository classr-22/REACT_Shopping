import { useEffect, useState } from "react";

export default function ShoppingComponent() {

    const [categories,setCategories] = useState([]);
    const [products,setproducts] = useState([]);
    const [cartItems,setCartItems] = useState([]);
    const [itemsCount,setItemsCount] = useState(0);

    function GetCartItemsCount(){
        setItemsCount(cartItems.length);
    }

    function LoadCategories(){
        fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(data=>{
            data.unshift('all');
            setCategories(data)
        })
    }

    function LoadProducts(url){
        fetch(url)
        .then(response => response.json())
        .then(data=>{
            setproducts(data)
        })
    }

    function handleCategoryChange(e){
        if(e.target.value=='ALL')
            LoadProducts(`https://fakestoreapi.com/products`)
        else
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value.toLowerCase()}`)
    }

    function handleAddToCart(e){
        alert('Item Added To Cart')
        fetch(`https://fakestoreapi.com/products/${e.target.id}`)
        .then(response => response.json())
        .then(data=>{
            cartItems.push(data);
            GetCartItemsCount();
        })
        
    }

    useEffect(()=>{
        LoadCategories();
        LoadProducts('https://fakestoreapi.com/products');
    },[cartItems.length]);

    return(
            <div className="container-fluid">
                <header className="bg-danger text-white text-center p-2">
                    <h1><span className="bi bi-cart"></span>Shopping Home</h1>
                </header>
                <section className="row mt-3">
                    <nav className="col-2">
                        <div>
                            
                                <label className="p-2">Select a Category</label>
                                <div>
                                <select className="form-select" onChange={handleCategoryChange}>
                                    {
                                        categories.map(category => 
                                            <option key={category}>{category.toUpperCase()}</option>
                                            )
                                    }
                                </select>
                                </div>
                        </div>
                    </nav>
                    <main className="col-7 d-flex flex-wrap overflow-auto" style={{height: '600px'}}>
                        {
                            products.map(product=>
                                <div key={product.id} className="card m-2 p-2" style={{width: '200px'}}>
                                    <img src={product.image} className="card-img-top" height="150"></img>
                                    <div className="card-header" style={{height: '160px'}}>
                                        <p>{product.title}</p>
                                    </div>
                                    <div className="card-body">
                                        <dl>
                                            <dt>Price</dt>
                                            <dd>{product.price}</dd>
                                            <dt>Rating</dt>
                                            <dd>
                                                <span className="bi bi-star-fill text-success"></span>
                                                {product.rating.rate} <span>[{product.rating.count}]</span>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" id={product.id} className="btn btn-danger w-100" onClick={handleAddToCart}>
                                            <spna className="bi bi-cart4"></spna>Add To Cart
                                        </button>
                                    </div>

                                </div>
                                )
                        }
                    </main>
                    <aside className="col-3">
                        <button className="btn btn-danger w-100">
                            <span className="bi bi-cart3"></span>[{itemsCount}] Your Cart Items
                        </button>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map(item=>
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <img src={item.image} width='50' height='50'/>
                                            </td>
                                        </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </aside>
                </section>
                
            </div>
    );
}