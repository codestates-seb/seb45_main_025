package com.example.SSM.be.domain.products.repository;

import com.example.SSM.be.domain.products.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
    Page<Products> findByCategory(String category, Pageable pageable);

    Page<Products> findAll(Specification<Products> specification, Pageable pageable);
}
