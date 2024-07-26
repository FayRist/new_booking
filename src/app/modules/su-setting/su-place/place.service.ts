import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private db: AngularFirestore) {}

  getData(){
    return this.db
    .collection('place')
      .snapshotChanges()
    .pipe(map((actions:any) => {
        return actions.map((action:any) => {
          const data = action.payload.doc.data();
          return data
        });
      })
    );
  }

  addData(form: any) {

    return this.db
      .collection('place')
      .doc('data')
      .update({
        // floorName: data,
        nameplace: form.apartmentName,
        locationplace: form.address,
        province: form.province,
        district: form.district,
        subdistrict: form.subdistrict,
        zipcode: form.zipcode,
        email: form.email,
        createdate: new Date()
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
}
