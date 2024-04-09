



import React, { Fragment, useState, useEffect } from 'react';
import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination';
import PriceSlider from './layout/PriceSlider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../actions/productActions';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);


    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);
    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
      
            toast.error(error);
        } else {
            dispatch(getProducts(keyword, currentPage, price, category, rating));
        }
    }, [dispatch,  toast, error, keyword, currentPage, price, category, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }


    return (
        <Fragment>
            <MetaData title={'Buy Best Product Online'} />
            <div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {keyword ? (
                            <Fragment>
                                {keyword && products.length === 0 && (
                                    <div className="col-12">
                                        <h1>No products found</h1>
                                    </div>
                                )}
                                {products && products.map(product => (
                                    <Product key={product._id} product={product} col={4} />
                                ))}
                            </Fragment>
                        ) : (

                            <Fragment>
                                <PriceSlider price={price} setPrice={setPrice}
                                    category={category} setCategory={setCategory}
                                    rating={rating} setRating={setRating} />

                                <div className="col-6 col-md-9">
                                    <div className="row">
                                        {products && products.length > 0 ? (
                                            products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))
                                        ) : (
                                            <div className="col-12">
                                                {loading ? (
                                                    <Loader />
                                                ) : (
                                                    <h1>Apologies, but there are no products with this criterion at the moment.</h1>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </section>
                {resPerPage <= (keyword ? products.length : productsCount) && (
                    <div className='d-flex justify-content-center mt-5'>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={keyword ? products.length : productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                )}
            </div>
            <ToastContainer />
        </Fragment>

    );
};

export default Home;





