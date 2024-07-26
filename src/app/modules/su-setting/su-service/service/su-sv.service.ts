import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuSvService {
  constructor(private db: AngularFirestore) {}

  getServiceData() {
    return this.db
      .collection('service')
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const id = action.payload.doc.id;
            const data = action.payload.doc.data();
            return { id, data };
          });
        })
      );
  }

  updateData(form: any) {

    return this.db
      .collection('service')
      .doc(form.id)
      .update({
        serviceName: form.serviceName,
        servicePrice: form.servicePrice,
        serviceAmount: form.serviceAmount,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  addData(form: any) {

    return this.db
      .collection('service')
      .add({
        id: '',
        serviceName: form.serviceName,
        servicePrice: form.servicePrice,
        serviceAmount: form.serviceAmount,
      })
      .then((docRef) => {

        this.db.collection('service').doc(docRef.id).update({
          id: docRef.id,
        });
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
// ------------------------------------
  updateDataFood(form: any) {

    return this.db
      .collection('service')
      .doc(form.id)
      .update({
        serviceName: form.serviceName,
        servicePrice: form.servicePrice,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  addDataFood(form: any) {

    return this.db
      .collection('service')
      .add({
        id: '',
        serviceName: form.serviceName,
        servicePrice: form.servicePrice,
        type: form.type,
      })
      .then((docRef) => {

        this.db.collection('service').doc(docRef.id).update({
          id: docRef.id,
        });
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
}
