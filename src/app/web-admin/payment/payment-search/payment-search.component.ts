import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/service/app/customer/customer.service';
import { OrderService } from 'src/app/core/service/app/order/order.service';
@Component({
  selector: 'app-payment-search',
  templateUrl: './payment-search.component.html',
  styleUrls: ['./payment-search.component.scss']
})
export class PaymentSearchComponent implements OnInit {

  public total: number;
  public currentPage = 1;
  public pageSize = 6;
  public orders: any;
  public openMenu: { [key: number]: boolean } = {};
  public searchValue: string = '';
  private searchTimeout: any;

  constructor(private elementRef: ElementRef,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getOrders();
    this.orders.forEach(order => {
      this.openMenu[order.id] = false;
    });
  }

  getOrders() {
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
    this.orderService.search(body).subscribe((data: any) => {
      if (data && data.error_code === "00") {
        let pageResponse = JSON.parse(data.data);
        this.total = pageResponse.total;
        this.orders = pageResponse.items;
      }
      else if (data && data.error_message) {
        this.toastr.error(data.error_message);
      } else {
        this.toastr.error("Đã có lỗi sảy ra");
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getOrders();
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
      this.orders.forEach(customer => {
        this.openMenu[customer.id] = false;
      });
    }
  }

  toggleMenu(index) {
    this.orders.forEach(customer => {
      if (customer.id !== index) {
        this.openMenu[customer.id] = false;
      }
    });
    this.openMenu[index] = !this.openMenu[index];
  }

  getById(id) {
    this.router.navigate(["/admin/payment/detail", id]);
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout); 
    this.searchTimeout = setTimeout(() => {
      this.getOrders();
    }, 500);
  }
}
