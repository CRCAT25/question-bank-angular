import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubSystemService {
    // get API SubSystem
    private apiSubSystem = 'https://gist.githubusercontent.com/CRCAT25/a9e8db8c572bf91cba0d9deb9706bec2/raw/4734a55fb8b44abdf977e177dbd86b249e6ba119/datasubsystem';

    // get API data tree list
    private apiDataTreeList = "https://gist.githubusercontent.com/CRCAT25/ba8731711d12bdc85defe69cf2842f9e/raw/223a1c8e0477e8134501278e051b28e4f5ac8efd/datatreelist";

    constructor(private http: HttpClient) { }

    getSubSystem(): Observable<any>{
        return this.http.get<any>(this.apiSubSystem);
    }

    getDataTreeList(): Observable<any>{
        return this.http.get<any>(this.apiDataTreeList);
    }
}
