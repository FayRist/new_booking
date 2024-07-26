import { take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afs: AngularFirestore) { }
  login(user: any) {
    // console.log(user);
    return new Promise((resolve, reject) => {
      this.afs.collection('user', (ref) => ref.where('username', '==', user.username)
      .where('password', '==', user.password)).valueChanges().subscribe(val => {
        if (val.length === 0) {
          resolve({ status: false, logindata: [] });
        }
        else {
          resolve({ status: true, logindata: val });
          localStorage.setItem('user', JSON.stringify(val[0]));
        }
      });

    });

  }


  loginMemberId(data: any) {
    return this.afs.collection('members').doc('memberinfo').collection('data', a => a.where('username', '==', data.username).where('password', '==', data.password)).valueChanges().pipe(take(1));
  }
}
