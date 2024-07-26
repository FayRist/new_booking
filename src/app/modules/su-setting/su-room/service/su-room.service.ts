import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuRoomService {
  constructor(private db: AngularFirestore) {}

  getFloorData() {
    return this.db
      .collection('list-floor', (a) =>
        a.orderBy('createdate', 'asc').orderBy('floorName', 'asc')
      )
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

  getRoomData(docRoom: any) {
    return this.db
      .collection('list-floor')
      .doc(docRoom)
      .collection('list-room', (a) =>
        a.orderBy('createdate', 'asc').orderBy('roomName', 'asc')
      )
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

  changeRoomPrice(idef:any, idr:any, seqF: any, seqR: any, day: any, holiday: any, deposit: any) {

    return  this.db.collection('list-floor').doc(idef)
    .collection('list-room').doc(idr)
    .update({
      priceDeposit :  deposit,
      pricePerDay: day,
      pricePerHoilday:  holiday,
    })
    .catch(function (error) {
        console.error("Error adding document: ", error);
    });
  }
}
