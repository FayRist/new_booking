import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  data: any = [
    {
      id: '1',
      data: '1',
    },
    {
      id: '2',
      data: '2',
    },
  ];
  constructor(private db: AngularFirestore) {}

  // getDataArray() {
  //   debugger;
  //   let data = this.data
  //   return data;
  // }

  getFloorData() {
    return this.db
      .collection('list-floor', (a) =>
        a.orderBy('createdate', 'asc').orderBy('floorName', 'asc')
      )
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

  getBookingData() {
    // var month = Stoday._d.getUTCMonth() + 1; //months from 1-12
    // var year = Stoday._d.getUTCFullYear();
    // var day = Stoday._d.getUTCDate();
    // var Smonth = Stoday._d.getUTCMonth() + 1; //months from 1-12
    // var Emonth = Stoday._d.getUTCMonth() + 1; //months from 1-12

    // let SMonth = year + (month-1);
    // let EMonth = year + (month+1);
    // let SDate= year + '-01-' + month;
    // let EDate= year + '-30-' + month;

    // var StoDate = new Date(SDate)
    // var EtoDate = new Date(EDate)
    // let sDate=new Date(Stoday._d.setHours(0, 0, 0));
    // let eDate=new Date(Etoday._d.setHours(23, 59, 59));

    return this.db
      .collection('booking', (a) =>
        // a.where('bookingCheckIn','>=',SMonth)
        // .where('bookingCheckOut','<=',SMonth)
        a.orderBy('createdate', 'asc')
      )
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

  getServiceInRoom(idDoc: any) {
    return this.db
      .collection(
        'booking'
        // , (a) => a.orderBy('createdate', 'asc').orderBy('floorName', 'asc')
      )
      .doc(idDoc)
      .collection('listservice')
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

  updateStatusPaid1(
    idDoc: any,
    paid: any,
    paidType: any,
    data: any,
    priceRoom: any,
    allTotal: any
  ) {
    ;
    return this.db
      .collection('booking')
      .doc(idDoc)
      .update({
        paidType: paidType,
        paid: paid,
        paidDate: data.date,
        paidPriceOnBooking: priceRoom,
        paidPriceAllTotal: allTotal,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  updateStatusPaid2(
    idDoc: any,
    paid: any,
    paidType: any,
    data: any,
    priceRoom: any,
    allTotal: any
  ) {
    ;
    return this.db
      .collection('booking')
      .doc(idDoc)
      .update({
        paidType: paidType,
        paid: paid,
        paidBankaccount: data.bankaccount,
        paidDate: data.date,
        paidImg: data.imgBill,
        paidPriceOnBooking: priceRoom,
        paidPriceAllTotal: allTotal,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  getBank() {
    return this.db
      .collection('bank')
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

  getstandard() {
    return this.db
      .collection('place')
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
}
