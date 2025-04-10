import { Component, OnInit } from '@angular/core';
import { HealthTips } from '../models/health-tips.model';
import { ShoppingService } from '../services/shooping.service';

@Component({
  selector: 'app-health-tips',
  standalone: false,
  templateUrl: './health-tips.component.html',
  styleUrl: './health-tips.component.css'
})
export class HealthTipsComponent implements OnInit {
  healthTips: HealthTips[];
  selectedHealthTip:HealthTips;
  constructor(private healthTipsService: ShoppingService) {}
 
  ngOnInit(): void {
    this.getHealthTips();
  }
 
  getHealthTips() {
    this.healthTipsService.getHealthTips().subscribe({
      next: (data) => {
        console.log(data);
        this.healthTips = data;
      }
     
    });
  }
 
  onSelectedHealthTip(tip:HealthTips){
    this.selectedHealthTip = tip;
  }
  onDeselectHealthTip() {
    this.selectedHealthTip = null;
  }
 

}
