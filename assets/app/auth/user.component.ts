
import {Component,  OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector:'app-user',
    templateUrl:'./user.component.html',
    styles:[`

           .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        
`]
})

export class UserComponent implements OnInit{
/*@Input()*/
        user:User;
        myForm:FormGroup;

    constructor(private authService:AuthService,private route: ActivatedRoute,private router:Router){}

    ngOnInit()
    {

        /*this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.authService.getUserById(id)
                    .subscribe((user:User)=>{
                        this.user=user;
                    },
                        ()=> {
                            this.myForm=new FormGroup({
                                email:new FormControl(this.user.email,Validators.required),
                                firstName:new FormControl(this.user.firstName,Validators.required),
                                lastName:new FormControl(this.user.lastName,Validators.required),
                                role:new FormControl(this.user.role,Validators.required)
                            })
                        });

            });*/
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.authService.getUserById(id);
                this.user=this.authService.getUserById(id);
                this.myForm=new FormGroup({
                    firstName:new FormControl(this.user.firstName,Validators.required),
                    lastName:new FormControl(this.user.lastName,Validators.required),
                    email:new FormControl(this.user.email,Validators.required),
                    role:new FormControl(this.user.role,Validators.required)
                });
            });
    }
    initForm()
    {
        this.myForm=new FormGroup({
            email:new FormControl(this.user.email,Validators.required),
            firstName:new FormControl(this.user.firstName,Validators.required),
            lastName:new FormControl(this.user.lastName,Validators.required),
            role:new FormControl(this.user.role,Validators.required)
        })
    }
    onEdit() {
        const user = new User(
            this.myForm.value.email,
            this.user.password,
            this.myForm.value.role,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.user.userId
        );
        this.user=user
        this.authService.updateUser(this.user)
            .subscribe(
                result => console.log(result)

            );
        this.router.navigateByUrl('');
    }

    onDelete() {
        this.authService.deleteUser(this.user)
            .subscribe(
                result => console.log(result)

            );
        this.router.navigateByUrl('');

    }

}