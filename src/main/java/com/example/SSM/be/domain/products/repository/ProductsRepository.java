package com.example.SSM.be.domain.products.repository;

import com.example.SSM.be.domain.products.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Long> {
}
