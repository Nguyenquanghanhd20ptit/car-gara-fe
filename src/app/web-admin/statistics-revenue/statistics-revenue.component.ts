import { DatePipe } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StatisticService } from 'src/app/core/service/app/statistic/statistic.service';

@Component({
  selector: 'app-statistics-revenue',
  templateUrl: './statistics-revenue.component.html',
  styleUrls: ['./statistics-revenue.component.scss'],
})
export class StatisticsRevenueComponent implements OnInit {

  public timeForm: FormGroup;
  public totalCustomer = 0;
  public totalOrder = 0;
  public totalRevenue = 0;
  public currentPage = 1;
  public pageSize = 8;
  public statistics: any;
  public searchValue;
  private searchTimeout: any;
  public openMenu: { [key: number]: boolean } = {};
  constructor(private elementRef: ElementRef,
    private statisticService : StatisticService,
    private toastr : ToastrService,
    public datePipe: DatePipe,
    private formBuilder: FormBuilder) { } 

  
  ngOnInit() {
    this.timeForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.searchBetweenTime();
    this.statistics.forEach(customer => {
      this.openMenu[customer.id] = false;
    });
  }

  searchBetweenTime() {
    console.log(this.datePipe.transform(this.timeForm.get('endDate').value, 'yyyy-MM-dd'));
    let body = {
      "keyword": this.searchValue,
      "filters": [{"name":"status","value":0,"operation":"eq"}],
      "pageable": {
        "page": this.currentPage,
        "page_size": this.pageSize,
        "sort": [
          { "property": "id", "direction": "asc" }
        ]
      }
    };
  
    const startDate = this.timeForm.get("startDate").value;
    const endDate = this.timeForm.get("endDate").value;
  
    if (startDate && endDate) {
      body["filters"] = [
        { "name": "createdAt", "value": startDate.getTime(), "operation": "gt" },
        { "name": "createdAt", "value": endDate.getTime(), "operation": "lt" },
        {"name":"status","value":0,"operation":"eq"}
      ];
    }
  
    this.statisticService.statisticRevenue(body).subscribe((data: any) => {
      if (data && data.errorCode === "00") {
        let pageResponse = JSON.parse(data.data);
        this.totalCustomer = pageResponse.totalOrder;
        this.totalOrder = pageResponse.totalOrder;
        this.totalRevenue = pageResponse.totalRevenue;
        this.statistics = pageResponse.items;
      } else if (data && data.errorMessage) {
        this.statistics.error(data.errorMessage);
      } else {
        this.toastr.error("Đã có lỗi sảy ra");
      }
    });
  }


  onSearchChange() {
    clearTimeout(this.searchTimeout); 
    this.searchTimeout = setTimeout(() => {
      this.searchBetweenTime();
    }, 500);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
  
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.totalCustomer / this.pageSize);
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
      this.statistics.forEach(statistic => {
        this.openMenu[statistic.customerId] = false;
      });
    }
  }
  
  
  toggleMenu(index) {
    this.statistics.forEach(statistic => {
      if(statistic.customerId !== index){
        this.openMenu[statistic.customerId] = false;
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