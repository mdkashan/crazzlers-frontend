import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useLatestProductsQuery } from '../redux/api/productAPI'
import toast from 'react-hot-toast';
import { Skeleton } from '../components/Loader';
import { CartItem } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart as addToCartAction } from '../redux/reducer/cartReducer';
function Home (){
    const { data, isLoading, isError } = useLatestProductsQuery("");

    if(isError) toast.error("Cannot fetch products.")

    const dispatch = useDispatch()    
    
    const handleAddToCart = (cartItem:CartItem) => {
       if(cartItem.stock < 1) return toast.error("Out of Stock"); 
       dispatch(addToCartAction(cartItem))
       toast.success("Item added to cart")
    }

    return (
        <div className="home">
            <section></section>

            <h1>Latest Products
            <Link to="/search" className='findmore'>More</Link>
            </h1>

            <main>
                {/* <ProductCard  productId='vfver' name='Jacket' price={2200} stock={10} handler={addToCart} image="https://m.media-amazon.com/images/I/61xcqiJNSWL._SX466_.jpg"/>
                <ProductCard  productId='qw2eb23uirbwv' name='Leather Wallet' price={149} stock={34} handler={addToCart} image="https://m.media-amazon.com/images/I/71SYvtX2YmL._SX679_.jpg"/>
                <ProductCard  productId='ngfbdxd' name='Mens Belt' price={350} stock={11} handler={addToCart} image="https://m.media-amazon.com/images/I/71aplh5AFZL._SX679_.jpg"/> */}
                { isLoading?<Skeleton width='80vw'/> : (

                     data?.products.map((product)=>(
                        <ProductCard  
                        key={product._id}
                        productId={product._id} 
                        name={product.name}
                        price={product.price} 
                        stock={product.stock} handler={handleAddToCart} 
                        photo={product.photo}/>
                    ))
                )
                   
                }

            </main>

        </div>
    )
}

export default Home