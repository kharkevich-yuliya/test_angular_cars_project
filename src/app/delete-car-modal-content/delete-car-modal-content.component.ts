import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TCar } from 'src/types';

@Component({
  selector: 'app-delete-car-modal-content',
  templateUrl: './delete-car-modal-content.component.html',
  styleUrls: ['./delete-car-modal-content.component.scss'],
})
export class DeleteCarModalContentComponent {
  @Input() car?: TCar;

  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
}
