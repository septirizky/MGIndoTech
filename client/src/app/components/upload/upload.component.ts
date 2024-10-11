import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  dataSource: any;
  displayedColumns: string[] = [];
  allColumns: string[] = [];
  selectedRows: any[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.http
      .post('http://localhost:5000/api/upload', formData)
      .subscribe((data: any) => {
        this.displayedColumns = Object.keys(data[0]);
        this.allColumns = ['select', ...this.displayedColumns];
        this.dataSource = data;
      });
  }

  toggleSelection(row: any) {
    if (this.selectedRows.includes(row)) {
      this.selectedRows = this.selectedRows.filter((r) => r !== row);
    } else {
      this.selectedRows.push(row);
    }
    console.log('Selected rows:', this.selectedRows);
  }

  importSelectedData() {
    if (this.selectedRows.length === 0) {
      alert('No data selected for import.');
      return;
    }
    const payload = {
      selectedData: this.selectedRows,
    };

    this.http.post('http://localhost:5000/api/import', payload).subscribe(
      (response) => {
        console.log('Data imported successfully', response);
      },
      (error) => {
        console.error('Failed to import data', error);
      }
    );
  }
}
