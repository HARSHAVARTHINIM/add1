import React from 'react';
import Navbar from "../components/common/Navbar";
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';
import { Banner, ImageSlider, StarRating } from '../components/common';
import { Breadcrumb, Pagination } from 'reactstrap';
import HomePage from '../views/home/HomePage';

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      
      <Breadcrumb />
      
      <Pagination />
      <HomePage />
      <ImageSlider />
      <StarRating />
      
      <Footer />
    </>
  );
}

export default BaseLayout;
