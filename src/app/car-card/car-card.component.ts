import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TCar } from 'src/types';
import { SERVER_URL } from 'src/config';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {
  @Input() car?: TCar;

  @Output() onUpdate: EventEmitter<TCar> = new EventEmitter();
  @Output() onDelete: EventEmitter<TCar> = new EventEmitter();

  SERVER_URL = SERVER_URL;
}
