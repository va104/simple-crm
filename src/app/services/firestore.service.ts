import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../../models/employee.class'

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  /**
 * CRUD => CREATE
 * Saves the employees in the Firestore as JSON
 * 2. Converts the employees object into JSON
 */
createEmployee(employee: Employee) {
 return this.firestore
    .collection('employees')
    .add(employee.toJSON())
}

  /**
* CRUD => READ
* 1. Gets the data from the employees collection
* 2. ValueChanges() returns an Observable of document data + new ID field
*/
  getAllEmployees() {
    return this.firestore
      .collection('employees')
      .valueChanges({ idField: 'employeeId' })
  }

  /**
* CRUD => UPDATE
* Updates the passed employees in the Firestore
* @param customerId The unique document id from firestore
*/

  /**
* CRUD => DELETE
* Deletes a employees from the Firestore
* @param customerId The unique document id from firestore
*/
}
