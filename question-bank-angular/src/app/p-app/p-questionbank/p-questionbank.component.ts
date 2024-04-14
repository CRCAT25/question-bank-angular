import { QuestionDTO } from './shared/question.dto';
import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../p-layout/shared/services/module.service';

@Component({
  selector: 'app-p-questionbank',
  templateUrl: './p-questionbank.component.html',
  styleUrl: './p-questionbank.component.scss'
})
export class PQuestionbankComponent implements OnInit{
  public dataSubModuleCategory: QuestionDTO[] = [];
  selectedSubModuleCategory: string = '';

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.selectedSubModuleCategory$.subscribe(sub => {
      this.selectedSubModuleCategory = sub;
      this.moduleService.getSubModuleData(sub).subscribe(datas => {
        this.dataSubModuleCategory = datas;
      });
    })
  }
}
