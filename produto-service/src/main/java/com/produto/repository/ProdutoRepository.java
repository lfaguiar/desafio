package com.produto.repository;

import org.springframework.data.repository.CrudRepository;

import com.produto.model.Produto;

public interface ProdutoRepository extends CrudRepository<Produto, Integer> {
}