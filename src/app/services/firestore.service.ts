import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Employee } from '../../models/employee.class'

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  allCustomers: Observable<any>;

  constructor(
    private firestore: AngularFirestore
  ) { }

  /**
 * CRUD => CREATE
 * Saves the customer in the Firestore as JSON
 * 1. Converts the date into a unix timestamp
 * 2. Converts the customer object into JSON
 */

  /**
* CRUD => READ
* 1. Gets the data from the employees collection
* 2. ValueChanges() returns an Observable of document data + new ID field
*/
  getAllEmployees() {
    this.allCustomers = this.firestore
      .collection('employees')
      .valueChanges({ idField: 'employeeId' })
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
