import { Credential } from '@/models/authentication/credential'

export class AuthenticationService {

  public authenticate(credential: Credential): void {
    console.log(credential)
  }
}
