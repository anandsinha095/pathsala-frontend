import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from '../../service/registerservice/register.service';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { CountrydataService } from '../../service/countrydata/countrydata.service';
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   registerForm!: FormGroup
   email!: AbstractControl;
   password!: AbstractControl;
   confirmPassword!: AbstractControl;
   
  constructor(
    private router: Router, private activateRoute: ActivatedRoute,
    private service: RegisterService,
    private formBuilder: FormBuilder,
    private crypt: EncryptService,
    private countryData: CountrydataService,
    private toastr: ToastrService,
    private apiCall: CommoncallService,    
    ) { }

    ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: [null, Validators.required],
     
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});
    // this.countryData.country.forEach(element => {
    //   this.arr.push(element.name)
    // });
  }
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordConfirmationInput.value == null) {
        return passwordConfirmationInput.setErrors({ required: true });
      }
      else if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
    };
  }
  async registerSubmit() {
    console.log(this.registerForm.value)
      try {
        await this.service.signup(this.registerForm.value)
        // let encryptData = this.crypt.set('123456*1@#$#@$^@1ERF', this.merged['email']);
        // let email = encryptData.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
        // this.router.navigate(['/mailverify/' + email]);
      }
      catch (e) {
        this.toastr.error(e, 'Opps!');
        this.ngOnInit();
      }
    }

}
