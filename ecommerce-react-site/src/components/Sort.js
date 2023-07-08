import ItemCardCSS from '../styles/ItemCard.module.css';

const Sort = ({products}) => {
    return (
        <div className={ItemCardCSS.sort}>
            <p>{products.length} Items</p>
            <div>
                <label for="sort">Sort:</label>
                <select name="sort">
                    <option value="best">Best Selling</option>
                    <option value="highest">Highest - Lowest</option>
                    <option value="lowest">Lowest - Highest</option>
                </select>
            </div>
        </div>
    );
}

export default Sort;