import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  public isCollapsedContent = false;
  constructor() { }

  ngOnInit(): void {
  }

  handleIscollapsed(value){
    this.isCollapsedContent = value;
    console.log(this.isCollapsedContent)
  }


}
