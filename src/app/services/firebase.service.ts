import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afDatabase: AngularFireDatabase) { }

  sendDataToFirebase(requestData: any) {
    const databaseRef = this.afDatabase.database.ref('requests');

    return databaseRef.push(requestData);
  }
}
