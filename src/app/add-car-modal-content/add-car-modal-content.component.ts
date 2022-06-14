import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TCarModel, TCarWithoutID } from 'src/types';

@Component({
  selector: 'app-add-car-modal-content',
  templateUrl: './add-car-modal-content.component.html',
  styleUrls: ['./add-car-modal-content.component.scss'],
})
export class AddCarModalContentComponent {
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

    this.onSubmit.emit(formData);
  }
}
