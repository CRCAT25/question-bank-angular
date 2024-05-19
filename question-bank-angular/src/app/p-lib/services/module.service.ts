// module.service.ts
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModuleService {
    moduleActive: string = '';
    cateModuleActive: string = '';
    subActive: string = '';
    private apiUrl = 'http://localhost:3000';
    private apiModulesUrl = 'http://localhost:3000/api/modules'; // Đường dẫn API getModules từ máy chủ Node.js
    private apiModuleUrl = 'http://localhost:3000/api'; // Đường dẫn API getModules từ máy chủ Node.js
    private apiCompany = 'https://gist.githubusercontent.com/CRCAT25/ea08cce0747253bcb59de3daff3c98c6/raw/a670a76a01e67edd53f8f91344c67bbc27b5d8ed/dataCompany'; // Đường dẫn API getModules từ máy chủ Node.js

    constructor(private http: HttpClient) { }

    private currentUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');


    setCurrentUrl(url: string): void {
        if (url) {
            this.currentUrlSubject.next(url);
        }
    }

    getCurrentUrl(): BehaviorSubject<string> {
        return this.currentUrlSubject;
    }

    getModules(): Observable<any> {
        return this.http.get<any>(this.apiModulesUrl); // Gửi yêu cầu GET đến API
    }

    getCategoryByModule(url: string): Observable<any> {
        return this.http.get<any>(this.apiModuleUrl + url); // Gửi yêu cầu GET đến API
    }

    updateQuestionStatus(questionId: string, newStatus: string): Observable<any> {
        const url = `${this.apiUrl}/updateQuestionStatus`; // Đường dẫn API cập nhật trạng thái
        // Tạo body cho yêu cầu POST
        const body = {
            questionId: questionId,
            newStatus: newStatus
        };
        // Gửi yêu cầu HTTP POST đến API để cập nhật trạng thái câu hỏi
        return this.http.post<any>(url, body);
    }

    deleteQuestion(questionId: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/deleteQuestion`, { questionId });
    }

    updateManyQuestionStatus(listQuestionId: string[], newStatus: string): Observable<any> {
        const url = `${this.apiUrl}/updateManyQuestionStatus`; // Đường dẫn API cập nhật trạng thái cho nhiều câu hỏi
        const body = {
            listQuestionId: listQuestionId,
            newStatus: newStatus
        };
        return this.http.post<any>(url, body);
    }

    deleteManyQuestions(listQuestionId: string[]): Observable<any> {
        const url = `${this.apiUrl}/deleteManyQuestions`; // Đường dẫn API xóa nhiều câu hỏi
        const body = {
            listQuestionId: listQuestionId
        };
        return this.http.post<any>(url, body);
    }

    addQuestion(newQuestion: any): Observable<any> {
        const url = `${this.apiUrl}/addQuestion`; // Đường dẫn API thêm câu hỏi mới
        return this.http.post<any>(url, newQuestion);
    }

    updateQuestionById(questionId: string, updatedQuestionData: any): Observable<any> {
        const url = `${this.apiUrl}/updateQuestion/${questionId}`;
        return this.http.post<any>(url, updatedQuestionData);
    }    
    
}
