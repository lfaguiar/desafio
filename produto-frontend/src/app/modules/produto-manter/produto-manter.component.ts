import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ProdutoService } from '../../services/produto.service';
import 'rxjs/add/operator/map'
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Produto } from '../../model/produto';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-produto-manter',
  templateUrl: './produto-manter.component.html',
  styleUrls: ['./produto-manter.component.css']
})
export class ProdutoManterComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  isEdit: boolean;
  isNew: boolean;
  
  produtos = [];
  produtoSelecionado: Produto;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) { 
    this.createForm();
    produtoService.getRestService('api/produtos').subscribe(
      res => {
        this.produtos = res;
      });
  }

  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  ngOnInit() {
  }

  detalharProduto(produtoSel){
    this.produtoSelecionado = produtoSel;
    this.isEdit = false;
    console.info(this.produtoSelecionado);
  }
  
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
        this.produtoSelecionado.img = reader.result.split(',')[1];
      };
    }
  }

  acionaInclusao(){
    this.produtoSelecionado = new Produto;
    this.isNew = true;
  }

  incluirProduto(){
    alert("Produto incluido com sucesso");
  }

  voltar(){
    this.isEdit = false;
    this.produtoSelecionado = null;
  }
}