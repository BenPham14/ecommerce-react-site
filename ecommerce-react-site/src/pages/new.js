import { useState, useEffect } from 'react';
import Header from "../components/Header";
import ItemCard from '../components/ItemCard';
import ItemCardCSS from "../styles/ItemCard.module.css";
import Loading from '../components/Loading';
import Sort from '../components/Sort';
import { loadProducts  } from '../services/api';
import Footer from '../components/Footer';

const New = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = useState("Best Selling");

    // const fetchData = useCallback(() => {
    //     setLoading(true);
    //     fetch("https://fakestoreapi.com/products")
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    //         .finally(() => setLoading(false))
    //     }, []);
    
    // useEffect(() => {
    //     fetchData()
    // }, [fetchData]);
    
    useEffect(() => {
        setLoading(true);
        loadProducts("")
            .then(data => setProducts(data))
            .finally(() => setLoading(false))
    }, [loadProducts]);
    
    if (loading) {
        return (
            <Loading />
        );
    }

    products.sort((a,b) => (
        orderBy === "Lowest - Highest" ? 
            a.price - b.price : 
            (orderBy === "Highest - Lowest" ? b.price - a.price : a.id - b.id)
    ));

    return (
        <>
            <Header />
            <main>
                <Sort 
                    products={products} 
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                />
                <div className={ItemCardCSS.catalog}>
                    {products.map((product) => (
                        <ItemCard 
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default New;