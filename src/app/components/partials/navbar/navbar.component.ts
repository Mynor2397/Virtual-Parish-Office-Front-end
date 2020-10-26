import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loged: boolean = false;
  active: boolean = false
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    if (this.userService.userValue) {
      this.loged = true;
    }
  }

  Logout() {
    this.userService.logout()
    this.router.navigateByUrl('/login')
  }

  changeView() {    
    if (this.active == false) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

}
