import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
  constructor(private http: HttpClient) {}

  exportData() {
    this.http
      .get('http://localhost:5000/api/export', { responseType: 'blob' })
      .subscribe((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'data.xlsx';
        link.click();
      });
  }
}
