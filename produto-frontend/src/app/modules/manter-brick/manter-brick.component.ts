import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ProdutoService } from '../../services/produto.service';
import 'rxjs/add/operator/map'
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var Morris: any;

@Component({
  selector: 'app-manter-brick',
  templateUrl: './manter-brick.component.html',
  styleUrls: ['./manter-brick.component.css']
})  

export class ManterBrickComponent implements OnInit {
  minhasPecas: Observable<any[]>;
  categoria: any;
  coresPeca = [];
  categorias = [];
  pecas = [];
  categoriaTijolos = [];

  title = 'app';
  versao = 'v3/';
  params = [];
  path_api = '';
  
  page = 1;
  pageNumbers = 0;
  pageSize = 100;
  indicePaginacao = [];

  constructor(private tijService: ProdutoService) {
    this.path_api = "lego/themes";
    this.path_api = "lego/colors"
    this.path_api = "lego/sets";
    this.path_api = "lego/parts";
    this.path_api = "lego/part_categories";

    console.log(this.minhasPecas);
  }
  
  ngOnInit() {
    //this.gravarPecas('/blocos');
    this.tijService.getRestService(this.path_api, '').subscribe(
      res => {
        this.categorias = res.results,
        this.initDonutChart(this.categorias);
        console.log(this.categorias)
      });
    }
    
  listarCategorias(cat){
    this.categoriaTijolos = cat;
    this.pecas = [];
    this.coresPeca = [];
    this.categorias.forEach(element => {
      if (this.categoriaTijolos.includes(element.id)){
        this.categoriaSelecionada(element)
      }
    });
  }

  categoriaSelecionada(cat){
    this.path_api = "lego/parts";
    this.params = ['page=1&page_size=3&part_cat_id='+ cat.id +'&'];
    this.tijService.getRestService(this.path_api, this.params).subscribe(
      res => {
        cat.exemploCat = res.results
    });
  }

  initDonutChart(categorias) {
    var dataAux = [];
    categorias.forEach(element => {
      var elemento = {
        label: element.name,
        value: element.part_count
      }
      dataAux.push(elemento);
    });
    console.log(dataAux);
    Morris.Donut({
        element: 'donut_chart',
        data: dataAux,
        colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 
                'rgb(255, 152, 0)', 'rgb(0, 150, 136)', 
                'rgb(96, 125, 139)', 'rgb(0, 0, 139)'],
        formatter: function (y) {
            return y + '%'
        }
    });
  }

  listarPecasPorCategoria(cat){
    this.categoria = cat;
    this.indicePaginacao = [];
    this.selectPaging(1);
  }
  
  selectPaging(page: number) {
    this.path_api = "lego/parts";
    this.page = page;
    console.info(page + ' pageSIze ' + this.pageSize);
    this.tijService.getRestService(this.path_api, 'part_cat_id=' + this.categoria.id +
    '&page=' + page + 
    '&page_size=' + this.pageSize + '&').subscribe(
      res => {
        this.pecas = res.results;
        this.pageNumbers = (res.count / this.pageSize);
        
        if (this.indicePaginacao.length === 0){
          for (var i = 0; i < this.pageNumbers; i++) {
            this.indicePaginacao.push(i+1);
          }
        }
        console.info('res.count:' + res.count + ' ' + this.pageNumbers);
      });
    }

  detalharPeca(idPeca: String){
    this.path_api = "lego/parts/" + idPeca + '/colors/';
    this.tijService.getRestService(this.path_api, '').subscribe(
      res => {
        this.coresPeca = res.results;
        console.info(this.coresPeca);
      });
  }

  pesquisarPeca(entrada, pagina){
    this.path_api = "lego/parts";
    this.params = ['page=' + pagina + '&page_size=100&search='+ entrada +'&'];
    this.tijService.getRestService(this.path_api, this.params).subscribe(
      res => {
        this.pecas = res.results;
        this.pageNumbers = (res.count / this.pageSize);
        
        if (this.indicePaginacao.length === 0){
          for (var i = 0; i < this.pageNumbers; i++) {
            this.indicePaginacao.push(i+1);
          }
        }
        console.info('res.count:' + res.count + ' ' + this.pageNumbers);
    });
  }

  gravarPecas(gravar) {
  }
}