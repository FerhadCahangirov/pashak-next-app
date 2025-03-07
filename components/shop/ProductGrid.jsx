import React from "react";
import { ProductCard } from "../cards/ProductCard";

export default function ProductGrid({
  gridItems = 4,
  allproducts = products,
  totalProducts = 0,
  loading
}) {
  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {
            loading ? "Loading..." : totalProducts === 0 ? 'No product(s) found!' : `${totalProducts} product(s) found`  
        }
      </div>
      <div className="grid-layout wrapper-shop" data-grid={`grid-${gridItems}`}>
        {/* card product 1 */}
        {allproducts.map((elm, i) => (
          <ProductCard product={elm} key={i} />
        ))}
      </div>{" "}
    </>
  );
}
