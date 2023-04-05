export class Employee {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string; //number 
    phoneNumber: string;
    avatar: string;
    address: {
        country: string,      
        city: string,     
        state: string,       
        street: string,
        zipCode: string,
    };
    employment: {
        keySkill: string,
        title: string,
        department: string,
    }

    constructor(obj?: any) {
      this.firstName = obj ? obj.firstName : '';
      this.lastName = obj ? obj.lastName : '';
      this.email = obj ? obj.email : '';
      this.birthDate = obj ? obj.birthDate : '';
      this.phoneNumber = obj ? obj.phoneNumber : '';
      this.avatar = obj ? obj.avatar : '../../../assets/img/user.png';
      this.address = obj ? {
        country: obj.address.country,      
        city: obj.address.city,     
        state: obj.address.state,       
        street: obj.address.street,
        zipCode: obj.address.zipCode,   
      } : {
        country: '',      
        city: '',     
        state: '',       
        street: '',
        zipCode: '',   
      };
      this.employment = obj ? {
        keySkill: obj.employment.keySkill,      
        title: obj.employment.title,      
        department: obj.employment.department,      
      } : {
        keySkill: '',      
        title: '',   
        department: '',   
      }
}

  /**
   * Converts the employee into JSON for saving on firebase
   */
   toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      phoneNumber: this.phoneNumber,
      avatar: this.avatar,
      address: {
        country: this.address.country,
        city: this.address.city,
        state: this.address.state,
        street: this.address.street,
        zipCode: this.address.zipCode,
      },
      employment: {
        keySkill: this.employment.keySkill,
        title: this.employment.title,
        department: this.employment.department
      }
    }
  }
}