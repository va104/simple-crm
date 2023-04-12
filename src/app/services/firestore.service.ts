import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Employee } from '../../models/employee.class'

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  employeesRef: AngularFirestoreCollection

  constructor(
    private firestore: AngularFirestore
  ) { 
    this.employeesRef = firestore.collection('employees')
  }

  /**
 * CRUD => CREATE
 * Saves the employees in the Firestore as JSON
 * 2. Converts the employees object into JSON
 * @param employee Information of the employee
 */
  createEmployee(employee: Employee) {
    return this.employeesRef.add(employee.toJSON())
  }

  /**
* CRUD => READ
* 1. Gets the data from the employees collection
* 2. ValueChanges() returns an Observable of document data + new ID field
*/
  getAllEmployees() {
    return this.employeesRef
      .valueChanges({ idField: 'employeeId' })
  }

  /**
* CRUD => READ
* 1. Get a single employee of the employees collection
* 2. EmployeeID is needed for the corresponding record
* @param employeeId The unique id of the employee
*/
  getSingleEmployee(employeeId: string) {
    return this.employeesRef
      .doc(employeeId)
      .valueChanges()
  }

  /**
* CRUD => UPDATE
* Updates the passed employees in the Firestore
* @param employeeId The unique document id from firestore
*/
  updateSingleEmployee(employeeId: string, employee: Employee) {
    return this.employeesRef
      .doc(employeeId)
      .update(employee.toJSON())
  }
  
  /**
* CRUD => DELETE
* Deletes a employees from the Firestore
* @param employeeId The unique document id from firestore
*/
  deleteSingleEmployee(employeeId: string) {
    return this.employeesRef
      .doc(employeeId)
      .delete()
  }
}
