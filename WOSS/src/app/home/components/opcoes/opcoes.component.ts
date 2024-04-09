import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.scss']
})
export class OpcoesComponent {
  constructor(public dialog: MatDialog) {}

  openModal() {
    this.dialog.open(ModalComponent);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 's';
    }

    return `${value}`;
  }
}
