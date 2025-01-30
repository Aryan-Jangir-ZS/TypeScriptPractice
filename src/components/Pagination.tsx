import React, { useEffect, useState } from "react";
import Card from "./Card";
import PageButtons from "./PageButtons";
import "../Pagination.css";

interface Product {
  id: number;
  images: string[];
  title: string;
}

const getData = async () => {
  const response = await fetch("https://dummyjson.com/products?limit=100");
  const data = await response.json();
  return data;
};

const Pagination: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; 
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setAllProducts(data.products);
    }
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allProducts.slice(startIndex, endIndex);

  return (
    <div className="pagination-wrapper">
      <div className="card-container">
        {currentItems.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            images={product.images[0]}
          />
        ))}
      </div>
      
      <PageButtons
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Pagination;