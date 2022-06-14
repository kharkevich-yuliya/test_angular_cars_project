import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TCar, TCarModel } from 'src/types';
import { object } from 'underscore';

@Component({
  selector: 'app-update-car-modal-content',
  templateUrl: './update-car-modal-content.component.html',
  styleUrls: ['./update-car-modal-content.component.scss'],
})
export class UpdateCarModalContentComponent {
  @Input() car?: TCar;
  @Input() models?: TCarModel[];

  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onSubmit: EventEmitter<FormData> = new EventEmitter();

  image?: File;

  changeImage(e: Event) {
    this.image = (e.target as HTMLInputElement).files?.[0];
  }

  handleSubmit(form: NgForm) {
    const formData = new FormData();

    for (const key in form.value) {
      const value = form.value[key];
      if (!value) return;
      formData.set(key, form.value[key]);
    }

    if (!this.image) return;
    formData.set('image', this.image, this.image.name);

    console.log(formData);
    this.onSubmit.emit(formData);
  }
}
