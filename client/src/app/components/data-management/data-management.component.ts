import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditDataDialog } from './edit-data-dialog.component';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss'],
})
export class DataManagementComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'nama',
    'email',
    'telepon',
    'alamat',
    'actions',
  ];

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.loadData();
  }

  loadData() {
    this.http.get('http://localhost:5000/api/data').subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  deleteData(id: string) {
    this.http.delete(`http://localhost:5000/api/data/${id}`).subscribe(() => {
      this.loadData(); 
    });
  }

  updateData(row: any) {
    const dialogRef = this.dialog.open(EditDataDialog, {
      width: '400px',
      data: { ...row }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .put(`http://localhost:5000/api/data/${row.id}`, result)
          .subscribe(() => {
            this.loadData(); 
          });
      }
    });
  }

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
