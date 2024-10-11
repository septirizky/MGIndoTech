import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  uploadCSV(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  importData(selectedData: any[]) {
    return this.http.post(`${this.apiUrl}/import`, selectedData);
  }

  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }

  updateData(id: string) {
    return this.http.delete(`${this.apiUrl}/data/${id}`);
  }

  deleteData(id: string) {
    return this.http.delete(`${this.apiUrl}/data/${id}`);
  }

  exportData() {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }
}
