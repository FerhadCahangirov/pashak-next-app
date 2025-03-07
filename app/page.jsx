import Topbar from '@/components/headers/Topbar'
import Header from '@/components/headers/Header'
import SearchModal from '@/components/modals/SearchModal';
import MobileMenu from '@/components/modals/MobileMenu';
import HeaderV2 from '@/components/headers/HeaderV2';
import Hero from '@/components/home/Hero';
import HeroV2 from '@/components/home/HeroV2';
import Categories from '@/components/home/Categories';
import Location from '@/components/home/Location';
import Products from '@/components/home/Products';
import About from '@/components/home/About';
import Footer from '@/components/home/Footer';
import Blogs from '@/components/home/Blogs';
import Brands from '@/components/cooporates/Brands'
import Collection from '@/components/home/Collection';

import React from 'react';

export const metadata = {
    title: "Home || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};


export default function Home() {
    return (
        <>
            <Topbar />
            <HeaderV2 />
            <Hero />
            <About/>
            <Categories />
            <Products />
            {/* <Collection/> */}
            <Location />
            <Blogs />
            {/* <Brands/> */}
            <Footer />
        </>
    );
}
