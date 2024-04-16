import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.handleIscollapsed()
  }

  handleIscollapsed(){
    this.isCollapsedChange.emit(this.isCollapsed);
  }
}
