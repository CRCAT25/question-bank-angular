import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    // get API company
    private apiCompany = 'https://gist.githubusercontent.com/CRCAT25/ea08cce0747253bcb59de3daff3c98c6/raw/a670a76a01e67edd53f8f91344c67bbc27b5d8ed/dataCompany';

    constructor(private http: HttpClient) { }

    getCompany(): Observable<any>{
        return this.http.get<any>(this.apiCompany);
    }
}
