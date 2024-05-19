import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubSystemService {
    // get API SubSystem
    private apiSubSystem = 'https://gist.githubusercontent.com/CRCAT25/a9e8db8c572bf91cba0d9deb9706bec2/raw/926ebcbaad177e31ff98517df047a353fc3dcc05/datasubsystem';

    constructor(private http: HttpClient) { }

    getSubSystem(): Observable<any>{
        return this.http.get<any>(this.apiSubSystem);
    }
}
