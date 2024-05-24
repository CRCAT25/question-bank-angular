import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    // get API Role
    private apiRole = 'https://gist.githubusercontent.com/CRCAT25/bd82692e2fb7f656734033443c45d37e/raw/8b1644db831fa8051dc7d9d139a080ddfb8e08ed/datarole';
    // get API role of president department
    private apiPresident = 'https://gist.githubusercontent.com/CRCAT25/acf89db41353d1e69734ddb783a03f26/raw/aa153c073f31203bafb037d765c7ad362d0fb0f5/datarolepresidentdepartment';

    constructor(private http: HttpClient) { }

    
    getRole(): Observable<any>{
        return this.http.get<any>(this.apiRole);
    }


    getRolePresidentByDepartment(): Observable<any>{
        return this.http.get<any>(this.apiPresident);
    }
}
