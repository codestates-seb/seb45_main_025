package com.example.SSM.be.domain.products.repository;

import com.example.SSM.be.domain.products.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products, Long> {
    Page<Products> findByCategoryOrderByCreatedAtDesc(String category, Pageable pageable);
}
