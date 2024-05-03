import React, { useState, useEffect } from 'react';
import SearchProducts from './Components/SearchProducts';
import ProductsTable from './Components/ProductsTable';
import PaginationComponent from './Components/TablePagination';
import DownloadButton from './Components/DownloadButton';
import { Container } from '@mui/material';

export interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setTotalProducts(data.length);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Container maxWidth="md">
      <h2>Product Management System</h2>
      <SearchProducts onSearch={handleSearch} />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ProductsTable products={filteredProducts} />
          <PaginationComponent totalProducts={totalProducts} />
          <DownloadButton data={filteredProducts} />
        </>
      )}
    </Container>
  );
};

export default App;
