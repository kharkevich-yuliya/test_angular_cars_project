import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarCardComponent } from './car-card/car-card.component';
import { UpdateCarModalContentComponent } from './update-car-modal-content/update-car-modal-content.component';
import { DeleteCarModalContentComponent } from './delete-car-modal-content/delete-car-modal-content.component';
import { AddCarModalContentComponent } from './add-car-modal-content/add-car-modal-content.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CarCardComponent,
    UpdateCarModalContentComponent,
    DeleteCarModalContentComponent,
    AddCarModalContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
