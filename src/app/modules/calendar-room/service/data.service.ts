import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DayPilot } from 'daypilot-pro-angular';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class DataService {
  resources: any[] = [
    // {
    //   name: 'Group 1',
    //   id: 'G1',
    //   expanded: true,
    //   children: [
    //     { name: 'Resource 1', id: 'R1' },
    //     { name: 'Resource 2', id: 'R2' },
    //   ],
    // },
    // {
    //   name: 'Group 2',
    //   id: 'G2',
    //   expanded: true,
    //   children: [
    //     { name: 'Resource 3', id: 'R3' },
    //     { name: 'Resource 4', id: 'R4' },
    //   ],
    // },
  ];

  resourcesData: any = [];

  events: any[] = [
    // {
    //   id: '1',
    //   resource: 'R1',
    //   start: '2023-11-03',
    //   end: '2023-11-07',
    //   text: 'Event 1',
    // },
    // {
    //   id: '2',
    //   resource: 'R1',
    //   start: '2023-11-08',
    //   end: '2023-11-15',
    //   text: 'Event 2',
    // },
    // {
    //   id: '3',
    //   resource: 'R2',
    //   start: '2023-10-25',
    //   end: '2023-11-10',
    //   text: 'Event 3',
    // },
  ];

  constructor(
    private http: HttpClient,
    private db: AngularFirestore, // public appRef: ChangeDetectorRef
  ) {
    this.getFloor();
    this.getDataCalendar();
  }

  getFloor() {
    this.db
      .collection('list-floor', (a) =>
        a.orderBy('createdate', 'asc').orderBy('floorName', 'asc')
      )
      .snapshotChanges()
      .subscribe((dataFloor: any) => {
        dataFloor.forEach((element: any) => {
          let arrayData: any[] = [];
          const dataFDoc = element.payload.doc.data();
          this.db
            .collection('list-floor')
            .doc(dataFDoc.id)
            .collection('list-room', (a) =>
              a.orderBy('createdate', 'asc').orderBy('roomName', 'asc')
            )
            .snapshotChanges()
            .subscribe((dataRoom: any) => {
              dataRoom.forEach((element: any) => {
                const dataRDoc = element.payload.doc.data();
                arrayData.push({
                  name: dataRDoc.roomName,
                  id: dataRDoc.idr,
                });
              });
            });

          this.resources.push({
            id: dataFDoc.id,
            expanded: true,
            name: dataFDoc.floorName,
            children: arrayData,

          });
        });
      });
  }

  getDataCalendar() {
    this.db
      .collection('booking')
      .snapshotChanges()
      .subscribe((data: any) => {
        data.forEach((element: any) => {

          const data = element.payload.doc.data();
          this.events.push({
            id: data.id,
            resource: data.bookingIdRoom,
            start: data.bookingCheckIn.toDate(),
            end: data.bookingCheckOut.toDate(),
            text: data.text,
          });
        });
        console.log(this.events);
      });
  }

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

  getSelectService() {
    return this.db
      .collection('service', (ref) => ref.where('type', '==', 'service'))
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const data = action.payload.doc.data();
            return data;
          });
        })
      );
  }

  getSelectFood() {
    return this.db
      .collection('service', (ref) => ref.where('type', '==', 'food'))
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const data = action.payload.doc.data();
            return data;
          });
        })
      );
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    // simulating an HTTP request
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {
    // simulating an HTTP request
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }

  createEvent(data: CreateEventParams): Observable<EventData> {
    let e: EventData = {
      start: data.start,
      end: data.end,
      resource: data.resource,
      id: DayPilot.guid(),
      text: data.text,
    };

    // simulating an HTTP request
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(e);
      }, 200);
    });

    //return this.http.post("/api/events/create", data);
  }

  saveBooking(form: any) {
    return this.db
      .collection('booking')
      .add({
        id: '',
        // resource: form.bookingIdRoom,
        // start: form.bookingCheckIn,
        // end: form.bookingCheckOut,
        text:
          'ชื่อ : ' +
          form.bookingFirstName +
          ' ' +
          form.bookingLastName +
          ' จำนวน : ' +
          form.bookingAmountPeple +
          ' คน ' +
          '[ รหัสอ้างอิง: ' + ' ' +']',
        bookingRoom: form.bookingRoom,
        bookingIdRoom: form.bookingIdRoom,
        bookingAmountPeple: form.bookingAmountPeple,
        bookingFirstName: form.bookingFirstName,
        bookingLastName: form.bookingLastName,
        bookingFullName: form.bookingFirstName + ' ' + form.bookingLastName,
        bookingCheckIn: form.bookingCheckIn,
        bookingCheckOut: form.bookingCheckOut,
        bookingBookingCountDay: form.bookingCountDay,
        bookingSeq: form.bookingSeq,
        bookingPrice: form.bookingPrice,
        bookingDeposit: form.bookingDeposit,
        paid: false,
        createdate: new Date(),
      })
      .then((docRef) => {
        this.db.collection('booking').doc(docRef.id).update({
          id: docRef.id,
          text:
          'ชื่อ : ' +
          form.bookingFirstName +
          ' ' +
          form.bookingLastName +
          ' จำนวน : ' +
          form.bookingAmountPeple +
          ' คน ' +
          '[ รหัสอ้างอิง: ' + docRef.id +']',
        });

        return docRef.id;
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  addServiceInBooking(listService:any, idDoc:any){

    return this.db
    .collection('booking')
    .doc(idDoc)
    .collection('listservice')
    .add({
      id: '',
      seq: listService.seq,
      serviceAmount: listService.serviceAmount,
      serviceName: listService.serviceName,
      servicePrice: listService.servicePrice,
      serviceType: listService.serviceType,
      createdate: new Date(),
    })
    .then((docRef) => {
      this.db.collection('booking').doc(idDoc)
      .collection('listservice').doc(docRef.id).update({
        id: docRef.id,
      });

      return docRef.id;
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }

  updateEvent(data: DayPilot.Event): Observable<any> {
    // simulating an HTTP request
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next('OK');
      }, 200);
    });
  }

  getServiceInRoom(docRoom:any){
    return this.db
    .collection('booking')
    .doc(docRoom)
    .collection('listservice', a =>a.orderBy('createdate', 'asc'))
    .snapshotChanges()
    .pipe(
      map((actions: any) => {
        return actions.map((action: any) => {
          // const id = action.payload.doc.id;
          const data = action.payload.doc.data();
          return data
        });
      })
    );
  }

  deleteServiceInRoom(idDoc:any, id:any){
    return this.db
    .collection('booking')
    .doc(idDoc)
    .collection('listservice')
    .doc(id)
    .delete()
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }

  updateServiceInRoom(listService:any, idDoc:any){

    return this.db
    .collection('booking').doc(idDoc)
    .collection('listservice').doc(listService.id)
    .update({
      serviceAmount: listService.serviceAmount,
      serviceName: listService.serviceName,
      servicePrice: listService.servicePrice,
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }

  deleteBooking(idDoc:any){
    return this.db
    .collection('booking')
    .doc(idDoc)
    .delete()
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }
}

export interface CreateEventParams {
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

export interface UpdateEventParams {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

export interface EventData {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
}
