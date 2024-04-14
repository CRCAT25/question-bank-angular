// module.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuleDTO } from '../dto/module.dto';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ModuleCategoryDTO } from '../dto/moduleCategory.dto';
import { SubModuleCategoryDTO } from '../dto/subModuleCategory.dto';
import { QuestionDTO } from '../../../p-questionbank/shared/question.dto';

@Injectable({
    providedIn: 'root'
})
export class ModuleService {
    // Tạo url link tới file modules.json trong folder assets
    private _url: string = "../../../../assets/modules.json";
    private selectedModuleNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public selectedModuleName$: Observable<string> = this.selectedModuleNameSubject.asObservable();

    private selectedSubModuleCategorySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public selectedSubModuleCategory$: Observable<string> = this.selectedSubModuleCategorySubject.asObservable();

    constructor(private http: HttpClient) { }

    // Tạo biến lưu trữ tất cả các module
    Modules: Observable<ModuleDTO[]> = this.http.get<any>(this._url).pipe(
        map(response => response.Modules)
    )

    // Phương thức lấy tất cả các module
    getModules(): Observable<ModuleDTO[]> {
        return this.Modules;
    }

    // Set giá trị selectedModuleNameSubject là name(nameModule được click). 
    // Sau khi giá trị được cập nhật, tất cả các subscriber của selectedModuleName$ sẽ nhận được thông báo về giá trị mới
    setSelectedModuleName(name: string) {
        this.selectedModuleNameSubject.next(name);
        // Lấy moduleCategory tương ứng với nameModule được chọn
        return this.getModuleCategoryByModule(name);
    }

    // Phương thức lấy tất cả các moduleCategory theo module bất kỳ
    getModuleCategoryByModule(nameModule: string): Observable<ModuleCategoryDTO[]> {
        return this.Modules.pipe(
            map(modules => {
                const selectedModule = modules.find(module => module.nameModule === nameModule);
                return selectedModule ? selectedModule.moduleCategory : [];
            })
        );
    }

    setSelectedSubModuleCategory(nameSubModuleCategory: string) {
        this.selectedSubModuleCategorySubject.next(nameSubModuleCategory);
        return this.getSubModuleData(nameSubModuleCategory);
    }

    getSubModuleData(nameSubModuleCategory: string): Observable<QuestionDTO[]> {
        return this.Modules.pipe(
            map(modules => {
                for (const module of modules) {
                    for (const moduleCategory of module.moduleCategory) {
                        const subModuleCategory = moduleCategory.moduleCategory.find((subModule: { nameSubModuleCategory: string; }) => subModule.nameSubModuleCategory === nameSubModuleCategory);
                        if (subModuleCategory) {
                            return subModuleCategory.data;
                        }
                    }
                }
                return [];
            })
        );
    }

}
