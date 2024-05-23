import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    // get API Role
    private apiRole = 'https://gist.githubusercontent.com/CRCAT25/bd82692e2fb7f656734033443c45d37e/raw/b281a6d378e69095c96a46d95076dfc34f58e101/datarole';
    // get API role of president department
    private apiPresident = 'https://gist.githubusercontent.com/CRCAT25/acf89db41353d1e69734ddb783a03f26/raw/f4697296ab28636b3c56758870cf9b6550ed05a0/datarolepresidentdepartment';

    constructor(private http: HttpClient) { }

    
    getRole(): Observable<any>{
        return this.http.get<any>(this.apiRole);
    }


    getRolePresidentByDepartment(): Observable<any>{
        return this.http.get<any>(this.apiPresident);
    }
}
