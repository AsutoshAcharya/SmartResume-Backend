import { Injectable } from '@nestjs/common';
//business logic
@Injectable({})
export class AuthService {
  login() {
    return { msg: 'sigied in' };
  }
  signUp() {
    return { msg: 'sigied up' };
  }
}
