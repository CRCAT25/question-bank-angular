import { ModuleService } from '../../../p-lib/services/module.service';
import { QuestionDTO } from './shared/question.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-questionbank',
  templateUrl: './p-questionbank.component.html',
  styleUrl: './p-questionbank.component.scss'
})
export class PQuestionbankComponent implements OnInit {
  public listQuestion: QuestionDTO[] = [];

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.getCurrentUrl().subscribe(url => {
      if (url) {
        this.moduleService.getCategoryByModule('/' + url.split('/')[1] + '/' + url.split('/')[2]).subscribe(item => {
          this.listQuestion = item.data;
        })
      }
    })
  }
}
