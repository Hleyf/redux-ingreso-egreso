import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private fireStore: AngularFirestore) { }


  initAutListener(){
    this.fireAuth.authState.subscribe( user => {
      console.log(user);
    })
  }

  createUser( nombre: string, email: string, password:string){
    // console.log({nombre,email,password});
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( ({user}) => {

      const newUser = new User( user.uid, nombre, user.email);
      return this.fireStore.doc(`${user.uid}/user`).set({...newUser})
    })
  }

  logUser( email: string, password:string){
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.fireAuth.auth.signOut();
  }

  isAuth(): Observable<boolean>{
    return this.fireAuth.authState.pipe(
      map( fbUser => fbUser != null ) 
    );
  }
}
