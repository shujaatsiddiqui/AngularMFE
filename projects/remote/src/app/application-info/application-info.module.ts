import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ApplicationInfoRoutingModule } from "./application-info-routing.module";
import { ApplicationInfoComponent } from "./application-info.component";

@NgModule({
  declarations: [
    // ApplicationInfoComponent
  ],
  imports: [
    CommonModule,
    ApplicationInfoRoutingModule,
    ApplicationInfoComponent
  ]
})
export class ApplicationInfoModule { }
