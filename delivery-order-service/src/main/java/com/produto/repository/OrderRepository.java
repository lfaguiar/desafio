package com.produto.repository;

import org.springframework.data.repository.CrudRepository;

import com.produto.model.Order;

public interface OrderRepository extends CrudRepository<Order, Integer> {
}
