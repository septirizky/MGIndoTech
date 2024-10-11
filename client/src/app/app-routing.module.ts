import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { DataManagementComponent } from './components/data-management/data-management.component';
// import { ExportComponent } from './components/export/export.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'data-management', component: DataManagementComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
