import { Component } from '@angular/core';
import { Remedy } from '../models/remedy.model';
import { RemedyService } from '../services/remedy.service';

@Component({
  selector: 'app-remedy',
  standalone: false,
  templateUrl: './remedy.component.html',
  styleUrl: './remedy.component.css'
})
export class RemedyComponent {
  remedies: Remedy[] = [];
  selectedRemedy: Remedy = new Remedy();

  constructor(private remedyService: RemedyService) { }

  ngOnInit(): void {
    this.loadRemedies();  
  }

  loadRemedies() {
    this.remedyService.getAll().then(() => {
      this.remedies = this.remedyService.newList;
    });
  }
  // deleteRemedy(id: number) {
  //   this.remedyService.deleteRemedy(id).subscribe(
  //     () => {
  //       this.loadRemedies();  
  //     },
  //     (error) => {
  //       console.error('Error deleting remedy:', error); 
  //     }
  //   );
  // }
  // openUpdateModal(remedy: Remedy) {
  //   this.selectedRemedy = { ...remedy };  
  // }

  
  // updateRemedy(): void {
  //   this.remedyService.update(this.selectedRemedy).subscribe(
  //     (updatedRemedy) => {
  //       // Handle the successful update, e.g., close modal and reload remedies
  //       this.loadRemedies();  // Reload the list of remedies after the update
  //       console.log('Remedy updated:', updatedRemedy);
  //     },
  //     (error) => {
  //       console.error('Error updating remedy:', error);
  //     }
  //   );
  // }

}
