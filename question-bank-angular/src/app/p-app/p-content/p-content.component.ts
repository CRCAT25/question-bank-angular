import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../p-layout/shared/services/module.service';

@Component({
  selector: 'app-p-content',
  templateUrl: './p-content.component.html',
  styleUrl: './p-content.component.scss'
})
export class PContentComponent implements OnInit {
  selectedSubModuleCategory: string = '';

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.selectedSubModuleCategory$.subscribe(sub => {
        this.selectedSubModuleCategory = sub;
      }
    )
  }
}
