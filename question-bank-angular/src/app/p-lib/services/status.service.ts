// module.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusDTO } from '../dto/status.dto';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    // Tạo url link tới file modules.json trong folder assets
    private _url: string = "../../../../assets/status.json";

    constructor(private http: HttpClient) { }

    // Tạo biến lưu trữ tất cả các status
    Status: Observable<StatusDTO[]> = this.http.get<any>(this._url).pipe(
        map(response => response.Status)
    )

    getStatus(): Observable<StatusDTO[]>{
        return this.Status;
    }

}
