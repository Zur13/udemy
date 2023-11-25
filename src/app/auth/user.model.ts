export class User {

  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public _tokenExpirationDate: Date
  ) {
  }

  get token() {
    // console.log(this._tokenExpirationDate, new Date() > this._tokenExpirationDate)
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      // invalid token
      return null;
    }
    return this._token;
  }


}
