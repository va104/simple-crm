export class User {
    constructor(
        public email: string,
        public id: string,
        //private: token should not be retrevable
        //we would like to check the validity with a getter
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    // access like a property, not a function
    // property what runs code when execution 
    get token() {
        // token is expired
        if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date()) {
            return null;
        }
        return this._token;
    }

}