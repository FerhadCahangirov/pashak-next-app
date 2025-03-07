"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Details from './Details'
import Description from './Description'
import RelatedProducts from './RelatedProducts'

function ShopDetailsContainer({ id }) {

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const fetchProductDetails = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/products/getDetails/${id}`);

            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }
            const data = await response.json();
            setProduct(data.product);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProductDetails();
    }, [fetchProductDetails]);

    return (isLoading && !product) ? <div>Loading...</div> : (
        <>
            <div className="tf-breadcrumb">
                <div className="container">
                    <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
                        <div className="tf-breadcrumb-list">
                            <Link href={`/products`} className="text">
                                Medicines
                            </Link>
                            <i className="icon icon-arrow-right" />

                            <span className="text">{product.name}</span>
                        </div>
                        {/* <ProductSinglePrevNext currentId={1} /> */}
                    </div>
                </div>
            </div>
            <Details product={product} />
            {
                product.content &&
                product.content.trim() !== "<p><br></p>" &&
                product.content.trim() !== "<p></p>" &&
                product.content.trim() !== "" &&
                <Description content={product.content} />
            }
            {
                product.relatedProducts &&
                product.relatedProducts.length > 0 &&
                <RelatedProducts products={product.relatedProducts} />
            }
        </>
    );
}

export default ShopDetailsContainer