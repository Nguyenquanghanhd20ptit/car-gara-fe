import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/core/service/app/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  public total: number;
  public numColumes = 4;
  public currentPage = 1;
  public pageSize = 5;
  public cars: any;
  public searchValue : "";
  private searchTimeout: any;
  public openMenu: { [key: number]: boolean } = {};
  constructor(private elementRef: ElementRef,
    private toastr : ToastrService,
    private carService : CarService) { } 

  ngOnInit() {
    this.searchCarts();
  }
  searchCarts(){
    let body = {
      "keyword": this.searchValue,
      "filters": [],
      "pageable": {
        "page": this.currentPage,
        "page_size": this.pageSize,
        "sort": [
          { "property": "id", "direction": "asc" }
        ]
      }
    }
    this.carService.search(body).subscribe((data: any) => {
      if (data && data.errorCode === "00") {
        let pageResponse = JSON.parse(data.data);
        this.total = pageResponse.total;
        this.cars = pageResponse.items;
        this.cars.forEach(car => {
          this.openMenu[car.id] = false;
        });
      }
      else if (data && data.errorMessage) {
        this.toastr.error(data.errorMessage);
      } else {
        this.toastr.error("Đã có lỗi sảy ra");
      }
    });
  }
  changePage(page: number) {
    this.currentPage = page;
    this.searchCarts();
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
      this.cars.forEach(customer => {
        this.openMenu[customer.id] = false;
      });
    }
  }
  
  
  toggleMenu(index) {
    this.cars.forEach(customer => {
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
  
  onSearchChange() {
    clearTimeout(this.searchTimeout); 
    this.searchTimeout = setTimeout(() => {
      this.searchCarts();
    }, 500);
  }
}
