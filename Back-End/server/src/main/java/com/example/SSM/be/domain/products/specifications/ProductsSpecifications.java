package com.example.SSM.be.domain.products.specifications;

import com.example.SSM.be.domain.products.entity.Products;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ProductsSpecifications {
    public static Specification<Products> productNameContains(String productName) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (!StringUtils.isEmpty(productName)) {
                predicates.add(builder.like(root.get("productName"), "%" + productName + "%"));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}