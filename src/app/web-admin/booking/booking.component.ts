import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/service/app/booking/booking.service';
import { CustomerService } from 'src/app/core/service/app/customer/customer.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

 
  public total: number;
  public numColumes = 4;
  public currentPage = 1;
  public pageSize = 6;
  public bookings: any;
  public openMenu: { [key: number]: boolean } = {};
  public searchValue: string = '';
  private searchTimeout: any;

  constructor(private elementRef: ElementRef,
    private bookingService : BookingService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.searchBooking();
    this.bookings.forEach(booking => {
      this.openMenu[booking.id] = false;
    });
  }

  searchBooking() {
    let body = {
      "keyword": this.searchValue,
      "filters": [{"name":"status","value":4,"operation":"eq"}],
      "pageable": {
        "page": this.currentPage,
        "page_size": this.pageSize,
        "sort": [
          { "property": "id", "direction": "asc" }
        ]
      }
    }
    this.bookingService.search(body).subscribe((data: any) => {
      if (data && data.error_code === "00") {
        let pageResponse = JSON.parse(data.data);
        this.total = pageResponse.total;
        this.bookings = pageResponse.items;
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
    this.searchBooking();
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
      this.bookings.forEach(booking => {
        this.openMenu[booking.id] = false;
      });
    }
  }

  toggleMenu(index) {
    this.bookings.forEach(booking => {
      if (booking.id !== index) {
        this.openMenu[booking.id] = false;
      }
    });
    this.openMenu[index] = !this.openMenu[index];
  }

  edit(id) {
    alert("edit" + id);
  }

  deleteItem(index) {
    alert("delete" + index)
  }

  detail(id){
    this.router.navigate(["admin/booking",id]);
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout); 
    this.searchTimeout = setTimeout(() => {
      this.searchBooking();
    }, 500);
  }
}
