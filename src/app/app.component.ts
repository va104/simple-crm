import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
   // if a observable is returned, subscribe is needed
    this.http.get('https://random-data-api.com/api/v2/users?size=20&response_type=json')
      .pipe(map(data => {
        const array = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            array.push({ ...data[key], index: key })
          }
        }
        console.log(array)
        return array
          ;
      }))
      .subscribe(data => {
        for (const dataElement of data) {
          const user = new User({
            firstName: dataElement.first_name,
            lastName: dataElement.last_name,
            email: dataElement.email,
            birthDate: dataElement.date_of_birth,
            street: dataElement.address.street_address,
            zipCode: dataElement.address.zip_code,
            city: dataElement.address.city,
          });

          // this.firestore
          //   .collection('users')
          //   .add(user.toJSON())
          //   .then((result: any) => {
          //   })
        }
      })
  }
}
