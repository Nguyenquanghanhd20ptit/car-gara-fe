import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/service/app/customer/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customerForm: FormGroup;
  public customer;
  public customerId;

  constructor(private formBuilder: FormBuilder, private toastr : ToastrService,
    private customerService : CustomerService, private router : Router,
    private route: ActivatedRoute,) { }

  error = {
    requiredField: "Thông tin này không được để trống",
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      avatar_url: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      let customerId  = +params['id'];
      this.customerId = customerId;
      this.getCustomerById(customerId);
    });
  }

  getCustomerById(id){
    this.customerService.getById(id).subscribe((data) =>{
      if(data && data.error_code === "00"){
        this.customer = JSON.parse(data.data);
        this.customerForm.patchValue({
          name: this.customer.name,
          email: this.customer.email,
          address: this.customer.address,
          phone_number: this.customer.phone_number,
          avatar_url: this.customer.avatar_url
        });
      } else if(data && data.error_message){
        this.toastr.error(data.error_message);
      } else {
        this.toastr.error("get customer thất bại")
      }
    })
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const form = this.customerForm.value;
      this.customerService.update(this.customerId,form).subscribe((data : any) => {
        if(data && data.error_code === "00"){
          this.toastr.success("updata khách hàng thành công")
          this.router.navigateByUrl("/admin/customer")
        } else if(data.error_message){
          this.toastr.error(data.error_message);
        } else {
          this.toastr.error("Thêm thất bại")
        }
      })
    } else {
      console.log("Form không hợp lệ");
    }
  }
}
