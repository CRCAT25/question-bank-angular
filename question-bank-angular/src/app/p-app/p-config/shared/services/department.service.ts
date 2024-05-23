import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    // get API Department
    private apiDepartment = 'https://gist.githubusercontent.com/CRCAT25/780f79f235157e8c685708ab1538cd8e/raw/2bcab5dce766e6b1384d47c6e879098adac1b66d/datadepartment';

    constructor(private http: HttpClient) { }

    getDepartment(): Observable<any>{
        return this.http.get<any>(this.apiDepartment);
    }
}
