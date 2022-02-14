import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  users: User[] = [];

  constructor() {
    this.users = [{
      "nome": "Lorem, ipsum",
      "telefone": "(84) 99999-9999, (84) 3272-0000",
      "cargo": "professor",
      "situacao": "Arquivado",
      "acoes": "visualizar | editar | arquivar"
    },
    {
      "nome": "Lorem, ipsum",
      "telefone": "(84) 99999-9999, (84) 3272-0000",
      "cargo": "professor",
      "situacao": "Arquivado",
      "acoes": "visualizar | editar | arquivar"
    },
    {
      "nome": "Lorem, ipsum",
      "telefone": "(84) 99999-9999, (84) 3272-0000",
      "cargo": "professor",
      "situacao": "Arquivado",
      "acoes": "visualizar | editar | arquivar"
    }];
  }

  ngOnInit(): void {
  }

}
