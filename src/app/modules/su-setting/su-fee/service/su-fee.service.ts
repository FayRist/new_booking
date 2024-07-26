import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuFeeService {
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

  getListFee(docFloor: any, docRoom: any) {
    return this.db
      .collection('list-floor')
      .doc(docFloor)
      .collection('list-room')
      .doc(docRoom)
      .collection('listFee')
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

  changeRoomPrice(seqF: any, seqR: any, day: any, holiday: any, deposit: any) {}
}
