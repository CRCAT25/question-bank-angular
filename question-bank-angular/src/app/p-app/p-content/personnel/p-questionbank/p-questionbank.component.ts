import { ModuleService } from '../../../p-layout/shared/services/module.service';
import { QuestionDTO } from './shared/question.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-questionbank',
  templateUrl: './p-questionbank.component.html',
  styleUrl: './p-questionbank.component.scss'
})
export class PQuestionbankComponent implements OnInit{
  public listQuestion: QuestionDTO[] = [];

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.selectedSubModuleCategory$.subscribe(sub => {
      this.moduleService.getSubModuleData(sub).subscribe(datas => {
        this.listQuestion = datas;
      });
    })
  }
}
