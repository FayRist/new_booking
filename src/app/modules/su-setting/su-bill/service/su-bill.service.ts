import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuBillService {
  constructor(private db: AngularFirestore, private http: HttpClient) {}

  getData(){
    return this.db
    .collection('billhead')
      .snapshotChanges()
    .pipe(map((actions:any) => {
        return actions.map((action:any) => {
          const data = action.payload.doc.data();
          return data
        });
      })
    );
  }

  addbill(data:any){

    return this.db
    .collection('billhead')
    .add({
      id: '',
      typeBiz: data.typeBiz ,
      apartmentName: data.apartmentName,
      address: data.address,
      taxId: data.taxId,
      phonenumber: data.phonenumber,
      mail: data.mail,
      logoPath: data.logoPath,
      createdate: new Date()
    })
    .then((docRef) => {
      this.db.collection('billhead').doc(docRef.id).update({
        id: docRef.id,
      });
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }

  updateBill(data:any){

    return this.db
    .collection('billhead').doc(data.id)
    .update({
      typeBiz: data.typeBiz ,
      apartmentName: data.apartmentName,
      address: data.address,
      taxId: data.taxId,
      phonenumber: data.phonenumber,
      mail: data.mail,
      logoPath: data.logoPath,
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }

}
