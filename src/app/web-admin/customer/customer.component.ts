import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/service/app/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public total: number;
  public numColumes = 4;
  public currentPage = 1;
  public pageSize = 6;
  public customers: any;
  public openMenu: { [key: number]: boolean } = {};
  public searchValue: string = '';
  private searchTimeout: any;

  constructor(private elementRef: ElementRef,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getCustomer();
    this.customers.forEach(customer => {
      this.openMenu[customer.id] = false;
    });
  }

  getCustomer() {
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
    this.customerService.searchCustomer(body).subscribe((data: any) => {
      if (data && data.errorCode === "00") {
        let pageResponse = JSON.parse(data.data);
        this.total = pageResponse.total;
        this.customers = pageResponse.items;
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
    this.getCustomer();
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
      if (customer.id !== index) {
        this.openMenu[customer.id] = false;
      }
    });
    this.openMenu[index] = !this.openMenu[index];
  }

  edit(id) {
    this.router.navigate(["admin/customer/update", id]);
  }

  deleteItem(index) {
    alert("delete" + index)
  }

  addNew() {
    this.router.navigateByUrl("admin/customer/addNew");
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout); 
    this.searchTimeout = setTimeout(() => {
      this.getCustomer();
    }, 500);
  }
}
