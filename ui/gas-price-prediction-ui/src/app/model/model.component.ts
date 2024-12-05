import { Component, inject } from '@angular/core';
import { DataService } from '../../service/data.service';
@Component({
  selector: 'app-model',
  standalone: true,
  imports: [],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ModelComponent {
  dataService = inject(DataService);
  model!: string;

  ngOnInit(): void {
    this.getModel();
  }

  getModel() {
    this.dataService.getModel().subscribe((res) => {
      console.log("model res: ", res);
    })
  }

}
