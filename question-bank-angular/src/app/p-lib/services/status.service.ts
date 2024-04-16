// module.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusDTO } from '../dto/status.dto';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private apiStatusUrl = 'http://localhost:3000/api/status'; // Đường dẫn API getStatus từ máy chủ Node.js

    constructor(private http: HttpClient) { }

    getStatus(): Observable<any> {
        return this.http.get<any>(this.apiStatusUrl); // Gửi yêu cầu GET đến API
    }

}
