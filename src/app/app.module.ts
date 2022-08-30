import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgorithmPageComponent } from './algorithm-page/algorithm-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatAnimatedIconComponent } from './algorithm-page/mat-animated-icon/mat-animated-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HungarianCodeComponent } from './algorithm-page/algorithms/hungarian/hungarian-code/hungarian-code.component';
import { CodeDisplayComponent } from './algorithm-page/code-display/code-display.component';
import { PlaybackControlsComponent } from './algorithm-page/playback-controls/playback-controls.component';
import { MatrixTableComponent } from './algorithm-page/matrix-table/matrix-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AlgorithmPageComponent,
    MatAnimatedIconComponent,
    HungarianCodeComponent,
    CodeDisplayComponent,
    PlaybackControlsComponent,
    MatrixTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
