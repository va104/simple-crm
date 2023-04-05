import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: Storage) { }

  saveImageFirestorage(file, callback) {
    const storageRef = ref(this.storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on('state_changed',
      null,
      null,
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
       return getDownloadURL(uploadTask.snapshot.ref)
        // callback(getDownloadURL(uploadTask.snapshot.ref)) 
      }
    );
  }
}
