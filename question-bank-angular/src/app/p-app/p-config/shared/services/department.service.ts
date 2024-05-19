import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    // get API Department
    private apiDepartment = 'https://gist.githubusercontent.com/CRCAT25/780f79f235157e8c685708ab1538cd8e/raw/9add0a4e4c6af92a88299c49880d8edc227a9557/datadepartment';

    constructor(private http: HttpClient) { }

    getDepartment(): Observable<any>{
        return this.http.get<any>(this.apiDepartment);
    }
}
