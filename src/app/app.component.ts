import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton, IonMenu, IonContent, IonMenuToggle, IonRadioGroup, IonRadio, IonItem } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, RouterModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton, IonMenu, IonContent, IonMenuToggle, IonRadioGroup, IonRadio, IonItem],
})
export class AppComponent {
  menuType: 'overlay' | 'reveal' | 'push' = 'overlay';
  constructor() {}
}
