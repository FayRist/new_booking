import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuAssetService {
  constructor(private db: AngularFirestore, private http: HttpClient) {} // public appRef: ChangeDetectorRef,

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

  getListAsset(docFloor: any, docRoom: any) {
    return this.db
      .collection('list-floor')
      .doc(docFloor)
      .collection('list-room')
      .doc(docRoom)
      .collection('listAsset')
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

  getAssetInRoom(idf:any, idr:any){
    return this.db
    .collection('list-floor')
    .doc(idf)
    .collection('list-room')
    .doc(idr)
    .collection('listAsset', (a) => a.orderBy('createdate', 'asc'))
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

  getAssetAll(){
    return this.db
    .collection('asset')
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

  addAssetInRoom(idf:any, idr:any, data:any) {

    return this.db
      .collection('list-floor')
      .doc(idf)
      .collection('list-room')
      .doc(idr)
      .collection('listAsset')
      .add({
        id: '',
        idr: idr,
        nameAsset: data.nameAsset,
        priceAsset: data.priceAsset,
        createdate: new Date()
      })
      .then((docRef) => {

        this.db.collection('list-floor')
        .doc(idf)
        .collection('list-room')
        .doc(idr)
        .collection('listAsset')
        .doc(docRef.id).update({
          id: docRef.id,
        });
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  updateAssetInRoom(idf:any, idr:any, ida:any, data:any) {

    return this.db
      .collection('list-floor')
      .doc(idf)
      .collection('list-room')
      .doc(idr)
      .collection('listAsset')
      .doc(ida)
      .update({
        nameAsset: data.nameAsset,
        priceAsset: data.priceAsset,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }


  addAsset(name: any) {

    return this.db
      .collection('asset')
      .add({
        id: '',
        nameAsset: name,
        createdate: new Date()
      })
      .then((docRef) => {

        this.db.collection('asset').doc(docRef.id).update({
          id: docRef.id,
        });
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }


  deleteAsset(idAsset:any){
    return  this.db.collection('asset').doc(idAsset)
    .delete()
    .catch(function (error) {
        console.error("Error adding document: ", error);
    });
  }
}
