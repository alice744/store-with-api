import React, { useEffect } from 'react';
import AppRoutes from '../Routes/Routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch } from 'react-redux';

import { getCategories } from '../../feauters/categories/categoriesSlice';
import { getProducts } from '../../feauters/products/productsSlice';
import FormUser from '../User/FormUser';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className='app'>
            <Header />
            <FormUser />
            <div className="container">
                <Sidebar />
                <AppRoutes />
            </div>

            <Footer />
        </div>
    );
}

export default App;
