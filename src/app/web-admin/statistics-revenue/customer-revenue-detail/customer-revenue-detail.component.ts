import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatisticService } from 'src/app/core/service/app/statistic/statistic.service';

@Component({
  selector: 'app-customer-revenue-detail',
  templateUrl: './customer-revenue-detail.component.html',
  styleUrls: ['./customer-revenue-detail.component.scss']
})
export class CustomerRevenueDetailComponent implements OnInit {

  public customerId : number;
  public orders : [any];
  public totalOrders : 0;
  public customer : any;
  public currentPage = 1;
  public pageSize = 8;
  constructor(private route : ActivatedRoute,
    private statisticService : StatisticService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.customerId = +params["id"];
      console.log(this.customerId);
      this.getRevenueCustomerDetail();
    })
  }

  getRevenueCustomerDetail(){
    let body = {
      "filters": [{"name":"customerId","value":this.customerId,"operation":"eq"}],
      "pageable": {
        "page": this.currentPage,
        "page_size": this.pageSize,
        "sort": [
          { "property": "id", "direction": "asc" }
        ]
      }
    };
    this.statisticService.statisticRevenueCustomerDetail(this.customerId,body)
    .subscribe((data:any) =>{
      if (data && data.error_code === "00") {
        let pageResponse = JSON.parse(data.data);
        this.totalOrders = pageResponse.total;
        this.orders = pageResponse.items;
        this.customer =  this.totalOrders != 0 ? this.orders[0].customer : this.customer;
      } else if (data && data.error_message) {
        this.toastr.error(data.error_message);
      } else {
        this.toastr.error("Đã có lỗi sảy ra");
      }
    });
  }
}
