import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModuleService } from './p-lib/services/module.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      const currentURL = event.url;
      this.moduleService.setCurrentUrl(currentURL);
    });
  }

  title = 'question-bank-angular';
}
