import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,MatBadgeModule,
    MatToolbarModule,MatBottomSheetModule,
    MatFormFieldModule,MatRadioModule,
    MatInputModule,MatChipsModule,MatDividerModule,
    MatTableModule,MatProgressBarModule,MatTabsModule,MatProgressSpinnerModule,
    MatPaginatorModule,MatSelectModule,MatStepperModule,MatDatepickerModule,
    MatRippleModule, MatIconModule, MatMenuModule, MatDialogModule, MatSnackBarModule,MatGridListModule,
    MatSidenavModule,MatListModule,MatTooltipModule,MatTreeModule,MatExpansionModule,
    MatBadgeModule
  ],
  exports:[
    MatButtonModule,
    MatCardModule,MatBadgeModule,
    MatToolbarModule,MatBottomSheetModule,
    MatFormFieldModule,MatChipsModule,MatProgressSpinnerModule,
    MatInputModule,MatProgressBarModule,MatTabsModule,MatDividerModule,MatExpansionModule,
    MatTableModule,MatSelectModule,MatStepperModule,MatDatepickerModule,
    MatPaginatorModule,MatRippleModule, MatIconModule, MatMenuModule, MatDialogModule, MatTreeModule,
    MatSnackBarModule,MatGridListModule,MatBadgeModule,
     MatRadioModule,MatSidenavModule,MatListModule,MatTooltipModule
  ]
})
export class MaterialModule { }
