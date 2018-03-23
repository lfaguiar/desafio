package com.produto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.produto.model.Produto;
import com.produto.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto save(@Validated Produto order) {
        return produtoRepository.save(order);
    }

    public Produto findById(Integer id){
        return produtoRepository.findOne(id);
    }

    public Iterable<Produto> findAll(){
        return produtoRepository.findAll();
    }

    public void delete(Integer id) {
        produtoRepository.delete(id);
    }
}