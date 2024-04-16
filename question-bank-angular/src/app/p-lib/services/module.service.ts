// module.service.ts
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModuleService {
    moduleActive: string = '';
    private apiModulesUrl = 'http://localhost:3000/api/modules'; // Đường dẫn API getModules từ máy chủ Node.js
    private apiModuleUrl = 'http://localhost:3000/api'; // Đường dẫn API getModules từ máy chủ Node.js

    constructor(private http: HttpClient) { }

    private currentUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');


    setCurrentUrl(url: string): void {
        if(url){
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

}
