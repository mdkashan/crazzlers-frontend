import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { CustomError } from '../types/api-types';
import toast from 'react-hot-toast';
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productAPI';
import { Skeleton } from '../components/Loader';
import { useDispatch } from 'react-redux';
import { CartItem } from '../types/types';
import { addToCart as addToCartAction } from "../redux/reducer/cartReducer";


function Search() {

  const dispatch = useDispatch();

  const { data: categoriesResponse, isLoading: loadingCategories, isError: categoriesIsError, error: categoriesError } = useCategoriesQuery('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState("400"); // Change from useState("400") to useState(400) for consistency in type
  const [category, setCategory] = useState('');
  const [page, setPage] = useState<number>(1);

  const { data: searchedData, isLoading: productLoading,  isError: productIsError, error: productError } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

//   console.log(searchedData);
  const isNextPage = page > 1;
  const isPrevPage = page < 4;

  if (categoriesIsError) {
    const err = categoriesError as CustomError;
    toast.error(err.data.message);
  }

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }


  const handleAddToCart = (cartItem:CartItem) => {
    if(cartItem.stock < 1) return toast.error("Out of Stock"); 
    dispatch(addToCartAction(cartItem))
    toast.success("Item added to cart")
 }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ''}</h4>
          <input
            type="range"
            min={99}
            max={10000}
            value={maxPrice} // Use maxPrice instead of sort
            onChange={(e) => setMaxPrice(e.target.value)} // Update maxPrice
          />
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {/* Update the category state instead of sort */}
            <option value="">All</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option value={i} key={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="search"
          value={search}
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {
          productLoading ? <Skeleton length={10} /> : (
            <div className="search-product-list">
            {searchedData?.products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                handler={handleAddToCart}
                photo={product.photo}
              />
            ))}
          </div>
          )
        }
        {
          searchedData && searchedData.totalPage > 1 && (
            <article>
            <button disabled={!isNextPage} onClick={() => setPage((prev) => prev - 1)}>
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev + 1)}>
              Next
            </button>
          </article>
          )
        }
      </main>
    </div>
  );
}

export default Search;
