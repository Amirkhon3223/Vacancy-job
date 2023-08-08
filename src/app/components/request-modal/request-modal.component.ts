import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FirebaseService} from "../../services/firebase.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent {
  fullName: string = '';
  phoneNumber: string = '';
  selectedFile: File | null = null;
  vacancyInfo: string; // Информация о выбранной вакансии

  // Внедряем MatDialogRef и MAT_DIALOG_DATA в конструктор
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<RequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Внедрение сервис в конструктор
    private firebaseService: FirebaseService,
  ) {
    this.vacancyInfo = data.vacancyInfo;
  }

  // Метод для проверки введенных данных перед отправкой
  isFormValid(): boolean {
    return [this.fullName.trim(), this.phoneNumber.trim(), this.selectedFile].every(Boolean)
  }

  onSubmit(): void {
    const requestData = {
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      resumeFile: this.selectedFile,
      vacancyInfo: this.vacancyInfo // содержит только id, title и city
    };

    const telegramBotToken = '6325488987:AAHs66FqAoyI61Gt3UFxd34p2JlIm4dYt7I';
    const chatId = '948069343'; // Chat ID, куда будут отправляться сообщения
    const textMessage = `
    New request received:
    Full Name: ${this.fullName}
    Phone Number: ${this.phoneNumber}
    Vacancy Info: ${JSON.stringify(this.vacancyInfo, null, 2)}
  `;

    this.http.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: chatId,
      text: textMessage
    }).subscribe(response => {
      console.log('Message sent to Telegram:', response);

      // Отправка файла
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('document', this.selectedFile as Blob, this.selectedFile?.name);
        this.http.post(`https://api.telegram.org/bot${telegramBotToken}/sendDocument`, formData)
          .subscribe(fileResponse => {
            console.log('File sent to Telegram:', fileResponse);
          });
      }
    });

    this.firebaseService.sendDataToFirebase(requestData).then(() => {
      console.log('Данные успешно отправлены на Firebase');
    })
      .catch(error => {
        console.error('Ошибка при отправке данных на Firebase', error);
      });

    this.dialogRef.close(requestData);
    console.log("Данные отправились:")
    console.log(requestData)
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
}