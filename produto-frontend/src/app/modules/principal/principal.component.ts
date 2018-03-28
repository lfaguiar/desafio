import { Component, OnInit } from '@angular/core';

import { OutroService } from '../../services/outro.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public message: string;
  public values: any[];

  constructor(private _dataService: OutroService) {
    this.message = 'Hello from HomeComponent constructor';    
  }
  ngOnInit() {
    this._dataService
        .getAll<any[]>()
        .subscribe((data: any[]) => this.values = data,
        error => () => {}, () => {});
  }
}
