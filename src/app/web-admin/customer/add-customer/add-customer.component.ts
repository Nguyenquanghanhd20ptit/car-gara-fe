import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/service/app/customer/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr : ToastrService,
    private customerService : CustomerService, private router : Router) {

     }
   error = {
    requiredField: "Thông tin này không được để trống",
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['',Validators.required],
      phone_number: ['', Validators.required],
      avatar_url: ['',Validators.required]
    });
  }
  onSubmit() {
    console.log("fđf")
    if (this.customerForm.valid) {
      const form = this.customerForm.value;
      this.customerService.addNew(form).subscribe((data : any) => {
        if(data && data.error_code === "00"){
          this.toastr.success("Thêm khách hàng thành công")
          this.router.navigateByUrl("/admin/customer")
        }else if(data && data.error_message){
          this.toastr.error(data.error_message);
        }
        else {
          this.toastr.error("Thêm thất bại")
        }
        
      })
    } else {
      console.log("Form không hợp lệ");
    }
  }
}
