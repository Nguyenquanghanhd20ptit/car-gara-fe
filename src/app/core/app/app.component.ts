import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ite-ecommerce';
  public doBeforeUnload(): void {
    this.detectRefresh();
  }
  detectRefresh() {
    if (performance.navigation.type === 1) {
      return true;
    } else {
      return false;
    }
  }
}
