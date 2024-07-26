import { Injectable } from '@angular/core';
import { Room } from '../module/room';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

export interface TagElement {
  tag_id: string;
  tag_color: string;
  tag_name: string;
  status: string;
  meaning_tag: string;
  active: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class SuPlanService {
  items: Room[] = [];

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

  addFloor(floor: any) {

    return this.db
      .collection('list-floor')
      .add({
        id: '',
        seqF: floor.seqF,
        floorName: floor.floorName,
        expanded: true,
        createdate: new Date(),
      })
      .then((docRef) => {

        this.db.collection('list-floor').doc(docRef.id).update({
          id: docRef.id,
        });
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  addRoom(idf: any, form: any) {
    return this.db
      .collection('list-floor')
      .doc(idf)
      .collection('list-room')
      .add({
        idr: '',
        seqR: form.seqR,
        roomView: form.roomView,
        roomType: form.roomType,
        roomSubBed: form.roomSubBed,
        roomPeople: form.roomPeople,
        roomName: form.roomName,
        priceDeposit: form.priceDeposit,
        pricePerDay: form.pricePerDay,
        pricePerHoilday: form.pricePerHoilday,
        createdate: new Date(),
      })
      .then((docRef) => {

        this.db
          .collection('list-floor')
          .doc(idf)
          .collection('list-room')
          .doc(docRef.id)
          .update({
            idr: docRef.id,
          });
        return docRef.id;
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  changeZoneData(data: any, id: any) {

    return this.db
      .collection('list-floor')
      .doc(id)
      .update({
        floorName: data,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  changeRoomData(data: any, idF: any) {

    return this.db
      .collection('list-floor')
      .doc(idF)
      .collection('list-room')
      .doc(data.idr)
      .update({
        priceDeposit: data.priceDeposit,
        pricePerDay: data.pricePerDay,
        pricePerHoilday: data.pricePerHoilday,
        roomName: data.roomName,
        roomPeople: data.roomPeople,
        roomSubBed: data.roomSubBed,
        roomType: data.roomType,
        roomView: data.roomView,
        seqR: data.seqR,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  deleteFloor(idDoc: any) {
    return this.db
      .collection('list-floor')
      .doc(idDoc)
      .delete()
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  deleteRoom(idDocF: any, idDocR: any) {
    return this.db
      .collection('list-floor')
      .doc(idDocF)
      .collection('list-room')
      .doc(idDocR)
      .delete()
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
}
