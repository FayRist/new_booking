import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuBankService {

  constructor(private db: AngularFirestore, private http: HttpClient) {} // public appRef: ChangeDetectorRef,

  getData(){
    return this.db
      .collection('bank')
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const data = action.payload.doc.data();
            return data
          });
        })
      );
  }

  addBank(data:any){
    return this.db
    .collection('bank')
    .add({
      id: '',
      bankCode: data.bankCode ,
      bankBranch: data.bankBranch,
      bankAccountNameF: data.bankAccountNameF,
      bankAccountNameL: data.bankAccountNameL,
      bankAccountNameFullName: data.bankAccountNameF+ " " + data.bankAccountNameL,
      bankAccountNumber: data.bankAccountNumber,
      createdate: new Date()
    })
    .then((docRef) => {

      this.db.collection('bank').doc(docRef.id).update({
        id: docRef.id,
      });
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }

  updateBank(data:any){
    return this.db
    .collection('bank').doc(data.id)
    .update({
      bankCode: data.bankCode ,
      bankBranch: data.bankBranch,
      bankAccountNameF: data.bankAccountNameF,
      bankAccountNameL: data.bankAccountNameL,
      bankAccountNameFullName: data.bankAccountNameF+ " " + data.bankAccountNameL,
      bankAccountNumber: data.bankAccountNumber,
      // createdate: new Date()
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }


  deleteBank(id:any){

    return this.db
    .collection('bank').doc(id)
    .delete()
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }


}
