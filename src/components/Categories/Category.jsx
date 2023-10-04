import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../feauters/api/apiSlice';

import styles from "../../styles/Category.module.css";
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Category = () => {
    const { id } = useParams();
    const { list } = useSelector(({ categories }) => categories);
    const { data, isLoading, isSuccess } = useGetProductsQuery(params);

    const defaultValues = {
        title: '',
        price_min: 0,
        price_max: 0,
    }

    const defaultParams = {
        categoryId: id,
        limit: 5,
        offset: 0,
        ...defaultValues,
    }
    const [cat, setCat] = useState(null);
    const [isEnd, setEnd] = useState(false);
    const [items, setItems] = useState([]);
    const [params, setParams] = useState(defaultParams);
    const [values, setValues] = useState(defaultValues);


    useEffect(() => {
        if (!id) return;

        setValues(defaultValues)
        setItems([]);
        setEnd(false);
        setParams({ ...defaultParams, categoryId: id })
    }, [id])

    useEffect(() => {
        if (!isLoading) return;

        if (!data.length) return setEnd(true);

        const products = Object.values(data);

        if (!products.length) return;
        setItems((_items) => [..._items, products])
    }, [data, isLoading])

    useEffect(() => {
        if (!id || !list.length) return;

        const category = list.find(({ item }) => item.id === id * 1);

        setCat(category)

    }, [list, id])


    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([]);
        setEnd(false);
        setParams({ ...defaultParams, ...values });
    }

    const handleReset = () => {
        setValues(defaultValues)
        setParams(defaultParams)
        setEnd(false);
    }

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>{cat?.name}</h2>

            <form className={styles.filters} onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Product name"
                        value={values.title}
                    />
                </div>
                <div className={styles.filter}>
                    <input
                        type="number"
                        name="price_min"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_min}
                    />
                    <span>Price from</span>
                </div>
                <div className={styles.filter}>
                    <input
                        type="number"
                        name="price_max"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_max}
                    />
                    <span>Price to</span>
                </div>

                <button type="submit" hidden />
            </form>

            {isLoading ? (
                <div className="preloader">Loading...</div>
            ) : !isSuccess || !items.length ? (
                <div className={styles.back}>
                    <span>No results</span>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <Products
                    title=""
                    products={items}
                    style={{ padding: 0 }}
                    amount={items.length}
                />
            )}

            {!isEnd && (
                <div className={styles.more}>
                    <button
                        onClick={() =>
                            setParams({ ...params, offset: params.offset + params.limit })
                        }
                    >
                        See more
                    </button>
                </div>
            )}
        </section>
    );
}

export default Category;
