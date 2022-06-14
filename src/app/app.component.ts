import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SERVER_URL } from 'src/config';
import { TCar, TCarModel, TCarWithoutID } from 'src/types';
import { debounce } from 'underscore';
import { DeleteCarModalContentComponent } from './delete-car-modal-content/delete-car-modal-content.component';
import { UpdateCarModalContentComponent } from './update-car-modal-content/update-car-modal-content.component';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  models: TCarModel[] = [];
  cars: TCar[] = [];

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.getCars();
    this.getCarModels();
  }

  getCarModels() {
    this.httpClient
      .get<TCarModel[]>(`${SERVER_URL}/models`, {})
      .subscribe((data) => {
        this.models = data;
      });
  }

  getCars(searchText: string = '') {
    this.httpClient
      .get<TCar[]>(`${SERVER_URL}/cars`, {
        params: {
          q: searchText,
        },
      })
      .subscribe((data) => {
        this.cars = data;
        console.log(data);
      });
  }

  searchCars = debounce((searchText: string) => this.getCars(searchText), 400);

  openAddCarModal() {}

  createCar(car: TCarWithoutID) {
    this.httpClient.post<TCar>(`${SERVER_URL}/cars`, {}).subscribe((car) => {
      this.cars = [car, ...this.cars];
    });
  }

  openUpdateCarModal(car: TCar) {
    const modal = this.modalService.open(UpdateCarModalContentComponent);
    modal.componentInstance.car = car;
    modal.componentInstance.models = this.models;

    modal.componentInstance.onSubmit.subscribe((formData: FormData) => {
      this.updateCar(formData);
      modal.close();
    });
    modal.componentInstance.onCancel.subscribe(() => {
      modal.close();
    });
  }

  updateCar(formData: FormData) {
    this.httpClient
      .put<TCar>(`${SERVER_URL}/cars`, formData)
      .subscribe((car) => {
        this.cars = this.cars.map((currentCar) =>
          currentCar.id === car.id ? car : currentCar
        );
      });
  }

  openDeleteCarModal(car: TCar) {
    const modal = this.modalService.open(DeleteCarModalContentComponent);
    modal.componentInstance.car = car;
    modal.componentInstance.onDelete.subscribe(() => {
      this.deleteCar(car.id);
      modal.close();
    });
    modal.componentInstance.onCancel.subscribe(() => {
      modal.close();
    });
  }

  deleteCar(carID: TCar['id']) {
    this.httpClient
      .delete(`${SERVER_URL}/cars/${carID}`, {
        responseType: 'text',
      })
      .subscribe({
        complete: () =>
          (this.cars = this.cars.filter((car) => car.id !== carID)),
        error: console.log,
      });
  }
}
