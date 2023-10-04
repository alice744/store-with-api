import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../feauters/api/apiSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../feauters/products/productsSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
    const navigate = useNavigate();
    const { list, related } = useSelector(({ products }) => products)

    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }
    }, [isLoading, isFetching, isSuccess, navigate])

    useEffect(() => {
        if (!data || !list.length) return;
        if (data) {
            dispatch(getRelatedProducts(data.category.id))
        }
    }, [data, dispatch, list.length])

    return !data ? (
        <section className='preloader'>Loading...</section>
    ) : (
        <>
            <Product {...data} />
            <Products products={related} amount={10} title="Related products" />

        </>
    );

}

export default SingleProduct;