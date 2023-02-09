import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  /**
   * CRUD => CREATE
   * Saves the customer in the Firestore as JSON
   * 1. Converts the date into a unix timestamp
   * 2. Converts the customer object into JSON
   */

  /**
   * CRUD => READ
   * 1. Gets the data from the customers collection
   * 2. Updates the local variable customers
   */

  readCustomerInformation() {
  }

  /**
   * CRUD => UPDATE
   * Updates the passed customer in the Firestore
   * @param customerId The unique document id from firestore
   */

  /**
   * CRUD => DELETE
   * Deletes a customer from the Firestore
   * @param customerId The unique document id from firestore
   */
}
