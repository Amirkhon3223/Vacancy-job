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
  email: string = '';
  coverText: string = '';
  phoneNumber: string = '';
  selectedFile: File | null = null;
  vacancyInfo: string; // Информация о выбранной вакансии

  // Внедряем MatDialogRef и MAT_DIALOG_DATA в конструктор
  constructor(
    private http: HttpClient, // Для подключения Тeлеграма через HTTPS
    public dialogRef: MatDialogRef<RequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Внедрение сервис в конструктор
    private firebaseService: FirebaseService,
  ) {
    this.vacancyInfo = data.vacancyInfo;
  }

  // Метод для проверки введенных данных перед отправкой
  isFormValid(): boolean {
    return ![this.fullName.trim(), this.phoneNumber.trim(), this.email.trim(), this.coverText].some(value => !value);
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const requestData = {
        fullName: this.fullName, // Берем ИМЯ для отправки
        phoneNumber: this.phoneNumber, // Также Номер
        email: this.email, // Получения почты
        coverText: this.coverText, // Получения сопроводительного письма
        resumeFile: this.selectedFile, // Файл резюме
        vacancyInfo: this.vacancyInfo // информация о вакансии, содержит только id, title и city
      };

      const telegramBotToken = '6325488987:AAHs66FqAoyI61Gt3UFxd34p2JlIm4dYt7I';
      const chatId = '948069343'; // Chat ID, куда будут отправляться сообщения
      // Уже то что будет отправиться. То есть, ИМЯ, НОМЕР И СВ и данные об вакансии в виде JSON
      const textMessage = `
            Новый запрос на вакансию:
            ФИО: ${this.fullName}
            Номер телефона: ${this.phoneNumber}
            Почта: ${this.email}
            Cопроводительное письмо: ${this.coverText}
            На вакансию: ${JSON.stringify(this.vacancyInfo, null, 2)}
        `;

      // Телеграм токен
      this.http.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        chat_id: chatId, // ИД чата к которому отправится эти данные...
        text: textMessage // Говорим, что данные которые уже взял сверху отправим в виде текста
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
      }).catch(error => {
        console.error('Ошибка при отправке данных на Firebase', error);
      });

      // Все успешно отправилось, закрываем мочалку и проверяем логи
      this.dialogRef.close(requestData);
      console.log(requestData)
      console.log("Данные отправились:")
    } else {
      alert("Ошибка заполнения.\nЗаполните все формы!")
    }
  }

  //Закрываем модалку
  closeModal(): void {
    this.dialogRef.close();
  }

  // Чтобы выбранные файл юзером сохранился в переменной для отправки
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
}
