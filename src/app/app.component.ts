import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from 'src/models/employee.class';
import { map } from 'rxjs';
import * as myGlobals from 'src/app/common/globals'
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  allDepartments: string[] = myGlobals.allDepartments;
  constructor(
    private http: HttpClient, 
    private firestore: AngularFirestore,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    // if a observable is returned, subscribe is needed
    this.http.get('https://random-data-api.com/api/v2/users?size=10&response_type=json')
      .pipe(map(data => {
        const array = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            array.push({ ...data[key], index: key })
          }
        }
        // console.log(array)
        return array
          ;
      }))
      .subscribe(data => {
        for (const dataElement of data) {
          const employee = new Employee({
            firstName: dataElement.first_name,
            lastName: dataElement.last_name,
            email: dataElement.email,
            birthDate: dataElement.date_of_birth,
            phoneNumber: dataElement.phone_number,
            avatar: dataElement.avatar,
            address: {
              country: dataElement.address.country,
              city: dataElement.address.city,
              state: dataElement.address.state,
              street: dataElement.address.street_address,
              zipCode: dataElement.address.zip_code,
            },
            employment: {
              keySkill: dataElement.employment.key_skill,
              title: dataElement.employment.title,
              department: this.assignRandomDepartment()
            }
          })

          // this.firestore
          //   .collection('employees')
          //   .add(employee.toJSON())
          //   .then((result: any) => {
          //   })
        }
      });

      this.authService.autoLogin();
  }

  assignRandomDepartment() {
    const number = Math.floor(Math.random() * (6 - 0 + 1) + 0);
    return this.allDepartments[number];
  }
}
