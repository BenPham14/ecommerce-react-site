import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import DetailsCSS from "../styles/Details.module.css";
import Header from "../components/Header";
import Loading from "../components/Loading"; 
import { loadProducts } from '../services/api';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { AppContext } from '../context/AppContext';
import Footer from '../components/Footer';

const Sizing = ({products, selectedSize, setSelectedSize}) => {
    const sizes = ['S','M','L'];

    return (
        (products.category === "men's clothing" || products.category === "women's clothing") &&
            <div>
                {sizes.map((size) => 
                    <button
                        key={size} 
                        style={{
                            backgroundColor: selectedSize === size && 'black', 
                            color: selectedSize === size && 'white'
                        }}
                        value={size} 
                        id={DetailsCSS.button} 
                        onClick={(event) => setSelectedSize(event.target.value)}
                    >
                        {size}
                    </button>
                )}
            </div>
    );
}

const Description = ({description, setDescription}) => {
    return (
        description ? 
            <VscChevronUp style={{width: '20px', height:'auto'}} onClick={() => setDescription(!description)} className={DetailsCSS.toggle}/> :
            <VscChevronDown style={{width: '20px', height:'auto'}} onClick={() => setDescription(!description)} className={DetailsCSS.toggle}/>
    );
}

const DetailsForm = ({products}) => {
    const [description, setDescription] = useState(true);
    const [itemAmount, setItemAmount] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const {updateCartAmount} = useContext(AppContext);

    return (
        <div className={DetailsCSS.form}>
            <h2>{products.title}</h2>
            <div className={DetailsCSS.size}>
                <h3>${products.price}</h3>
                <Sizing 
                    products={products}
                    selectedSize = {selectedSize}
                    setSelectedSize = {setSelectedSize}
                />
            </div>
            <div className={DetailsCSS.submit}>
                <input type='number' min={1} defaultValue={1} onChange={(event) => setItemAmount(Number(event.target.value))}/>
                <button
                    onClick={() => 
                        (products.category === "men's clothing" || products.category === "women's clothing") ? 
                            (selectedSize !== "" && updateCartAmount(products.id, itemAmount, selectedSize)) :
                            updateCartAmount(products.id, itemAmount, selectedSize)
                    } 
                >ADD TO BAG</button>
            </div>
            <div className={DetailsCSS.description}>
                <div>
                    <h3>Description</h3>
                    <Description 
                        description={description} 
                        setDescription={setDescription}
                    />
                    </div>
                <p>{description && products.description}</p>
            </div>
        </div>
    );
}

const Details = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        setLoading(true);
        loadProducts(params.id)
            .then(data => setProducts(data))
            .finally(() => setLoading(false))
    }, [loadProducts]);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <Header />
            <main>
                <div className={DetailsCSS.nav}>
                    <Link 
                        to={products.category === "men's clothing" ? '/men' : (products.category === "women's clothing" ? "/women" : "/other")}
                        style={{color: 'black'}}
                    >
                        {products.category === "men's clothing" ? 'Men' : (products.category === "women's clothing" ? "Women" : "Other")}
                    </Link>
                    <p>/</p>
                    <p>Details</p>
                </div>
                <div className={DetailsCSS.product}>
                    <img src={products.image} alt={products.title}/>
                    <DetailsForm products={products}/>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Details;