// module.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubSystemService {
    // get API company
    private apiSubSystem = 'https://gist.githubusercontent.com/CRCAT25/a9e8db8c572bf91cba0d9deb9706bec2/raw/b6b1391a3ab10f561b789d4443ad241c9e5c6f8b/subsystem';

    constructor(private http: HttpClient) { }

    getSubSystem(): Observable<any>{
        return this.http.get<any>(this.apiSubSystem);
    }
}
