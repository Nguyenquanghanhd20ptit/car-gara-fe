import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-revenue',
  templateUrl: './statistics-revenue.component.html',
  styleUrls: ['./statistics-revenue.component.scss']
})
export class StatisticsRevenueComponent implements OnInit {

  public total: number;
  public numColumes = 4;
  public currentPage = 1;
  public pageSize = 8;
  public customers: any;
  public openMenu: { [key: number]: boolean } = {};
  constructor(private elementRef: ElementRef) { } 

  ngOnInit() {
    this.customers = [
      { 
        id : 1,
        name: "Nguyễn Quang Hạnh", 
        phone: "0383870219", 
        email: "hanhd20ptit@gmail.com", 
        address: "Ba vì - Hà nội" 
      }, { 
        id : 2,
        name: "Nguyễn Quang Hạnh", 
        phone: "0383870219", 
        email: "hanhd20ptit@gmail.com", 
        address: "Ba vì - Hà nội" 
      }, { 
        id : 3,
        name: "Nguyễn Quang Hạnh", 
        phone: "0383870219", 
        email: "hanhd20ptit@gmail.com", 
        address: "Ba vì - Hà nội" 
      }, { 
        id : 4,
        name: "Nguyễn Quang Hạnh", 
        phone: "0383870219", 
        email: "hanhd20ptit@gmail.com", 
        address: "Ba vì - Hà nội" 
      }, { 
        id : 5,
        name: "Nguyễn Quang Hạnh", 
        phone: "0383870219", 
        email: "hanhd20ptit@gmail.com", 
        address: "Ba vì - Hà nội" 
      },
    ];
    this.customers.forEach(customer => {
      this.openMenu[customer.id] = false;
    });
    this.total = 20;
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.total / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const actionMenus = this.elementRef.nativeElement.querySelectorAll('.action-menu');
    let isMenuClicked = false;
    actionMenus.forEach(actionMenu => {
      if (actionMenu.contains(event.target as Node)) {
        isMenuClicked = true;
        return;
      }
    });
  
    if (!isMenuClicked) {
      this.customers.forEach(customer => {
        this.openMenu[customer.id] = false;
      });
    }
  }
  
  
  toggleMenu(index) {
    this.customers.forEach(customer => {
      if(customer.id !== index){
        this.openMenu[customer.id] = false;
      }
    });
    this.openMenu[index] = !this.openMenu[index];
  }
  
  edit(index) {
    alert("edit" + index)
  }

  deleteItem(index) {
    alert("delete" + index)
  }
}