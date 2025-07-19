import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss'
})
export class FormEmployeeComponent {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  private _employeeService: EmployeeService = inject(EmployeeService)

  frontImageFile: File | null = null;
  backImageFile: File | null = null;
  frontImagePreview: string | null = null;
  backImagePreview: string | null = null;
  showCamera = false;
  isProcessing = false;

  onFileSelected(event: Event, type: 'front' | 'back') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (type === 'front') {
        this.frontImageFile = file;
        this.createImagePreview(file, (preview) => {
          this.frontImagePreview = preview;
        });
      } else {
        this.backImageFile = file;
        this.createImagePreview(file, (preview) => {
          this.backImagePreview = preview;
        });
      }
    }
  }

  private createImagePreview(file: File, callback: (preview: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  async scanFrontSide() {
    if (!this.frontImageFile) return;

    this.isProcessing = true;
    const data = { image_back: this.frontImagePreview };
    const res:any = await this._employeeService.saveBackScaner(data);
    console.log(res);
    /* this.errorMessage = null;

    const formData = new FormData();
    formData.append('image', this.frontImageFile);

    this.http.post<any>(`${this.baseUrl}/scan-cedula-front`, formData)
      .subscribe({
        next: (response) => {
          this.isProcessing = false;
          if (response.success) {
            this.currentStep = 2;
          } else {
            this.errorMessage = response.message || 'Error al procesar la cara frontal';
          }
        },
        error: (error) => {
          this.isProcessing = false;
          this.errorMessage = 'Error al procesar la imagen';
          console.error('Error:', error);
        }
      }); */
  }
}
