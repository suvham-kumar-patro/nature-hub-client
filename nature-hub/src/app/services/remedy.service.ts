import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Remedy } from '../models/remedy.model';

@Injectable({
  providedIn: 'root'
})
export class RemedyService {
  newData:Remedy=new Remedy();
  newList:Remedy[];
  readonly ppApiUrl='https://localhost:44337/api/Remedy';

  constructor(private http:HttpClient) { }
 
  getAll(){
    return this.http.get(this.ppApiUrl).toPromise().then(res=>this.newList=res as Remedy[]);
  }
  // deleteRemedy(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.ppApiUrl}/${id}`);
  // }
  // addRemedy(){
  //   return this.http.post(this.ppApiUrl,this.newData);
  // }
  // // updateRemedy(selectedRemedy: Remedy){
  // //    return this.http.put(this.ppApiUrl+'/'+this.newData.RId,this.newData);
  // // }
  // update(remedy: Remedy): Observable<Remedy> {
  //   return this.http.put<Remedy>(`${this.ppApiUrl}/${remedy.RId}`, remedy);
  // }
}
