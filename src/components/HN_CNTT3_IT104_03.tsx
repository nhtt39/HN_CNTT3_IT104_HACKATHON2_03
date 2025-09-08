import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HN_CNTT3_IT104_03.scss';

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

const HN_CNTT3_IT104_03 = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'Laptop', price: 30000000, inStock: true },
        { id: 2, name: 'Chuột', price: 4200000, inStock: false },
        { id: 3, name: 'Bàn phím', price: 6000000, inStock: true },
    ]);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newInStock, setNewInStock] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const addProduct = () => {
        if (newName && newPrice > 0) {
            const newProduct: Product = {
                id: products.length + 1,    
                name: newName,
                price: newPrice,
                inStock: newInStock,
            };
            setProducts([...products, newProduct]);
            setNewName('');
            setNewPrice(0);
            setNewInStock(true);
        }
    };

    const toggleStock = (id: number) => {
        setProducts(products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
    };

    const deleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <div className="card header-card">
                <div className="card-body d-flex justify-content-center align-items-center">
                    <i className="bi bi-box-seam me-2"></i>
                    <h4 className="mb-0">Quản lý Sản phẩm</h4>
                </div>
            </div>

            <div className="card add-card mt-3">
                <div className="card-body">
                    <h5>+ Thêm sản phẩm mới</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên sản phẩm"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Giá (đ)"
                                value={newPrice}
                                onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={newInStock}
                                    onChange={(e) => setNewInStock(e.target.checked)}
                                />
                                <label className="form-check-label">Còn hàng</label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" onClick={addProduct}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card list-card mt-3">
                <div className="card-body">
                    <h5>Danh sách sản phẩm</h5>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Trạng thái</th>
                                <th>Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price.toLocaleString()} đ</td>
                                    <td>
                                        <span className={`badge ${product.inStock ? 'bg-success' : 'bg-danger'}`}>
                                            {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary btn-sm me-2"
                                            onClick={() => toggleStock(product.id)}
                                        >
                                            Đánh dấu
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                        <span>Tổng: {products.length} sản phẩm</span>
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HN_CNTT3_IT104_03;