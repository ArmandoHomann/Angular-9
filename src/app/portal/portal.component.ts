import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private router: Router, ) { }

  title = "Dashboard";
  portalDateTime = new Date().getFullYear();
  bashboardScreen = true;
  forexScreen = false;

  navigate() {
    this.router.navigate(['/login'])
    .then(success => console.log('navigation success?' , success))
    .catch(console.error);
  }

  displayDashboard()
  {
    this.bashboardScreen = true;
    this.forexScreen = false;
  }

  displayForex()
  {
    this.bashboardScreen = false;
    this.forexScreen = true;
  }

  ngOnInit(): void {
  }

}
