import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";
import {HotToastService} from "@ngneat/hot-toast";


interface VacancyInfo {
  title: string;
  city: string;
}
@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent {
  fullName: string = '';
  email: string = '';
  coverText: string = '';
  phoneNumber: string = '';
  selectedFile: File | null = null;
  vacancyInfo: VacancyInfo;


  constructor(
    private toast: HotToastService,
    private http: HttpClient, // Для подключения через HTTPS
    public dialogRef: MatDialogRef<RequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vacancyInfo: VacancyInfo },
  ) {
    this.vacancyInfo = data.vacancyInfo;
  }

  // Метод для проверки введенных данных перед отправкой
  isFormValid(): boolean {
    return ![this.fullName.trim(), this.phoneNumber, this.email.trim(), this.coverText].some(value => !value);
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const requestData = {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        coverText: this.coverText,
        resumeFileName: this.selectedFile?.name,
        vacancyTitle: this.vacancyInfo.title,
        vacancyCity: this.vacancyInfo.city
      };

      if (this.selectedFile){
        this.uploadFile(this.selectedFile)
      }

      this.http.post('http://127.0.0.1:8000/userResponse', requestData).subscribe(response => {
        this.toast.success('Ваша заявка на данную позицию была отправлена!');
        this.dialogRef.close(requestData);
      }, error => {
        this.toast.error('Ошибка при отправке запроса!');
      });
    } else {
      this.toast.warning('Ошибка при отправке запроса! Убедитесь что все данные были заполнены');
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('uploaded_file', file);

    this.http.post('http://127.0.0.1:8000/upload-file/', formData).subscribe(
      (response) => {
        this.toast.success('Файл успешно загружен');
      },
      (error) => {
        this.toast.error('Ошибка при загрузке файла');
      }
    );
  }
}
