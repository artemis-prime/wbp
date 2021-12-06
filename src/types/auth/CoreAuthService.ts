
import type CreateUserParams from './CreateUserParams'
import type AuthResult from './AuthResult'

export interface CoreUser {
  email: string | null
  displayName: string | null
}

interface CoreAuthService {

  currentAuthUser: CoreUser | undefined
  authStateLoading: boolean     // currentAuthUser status is loading
  isLoading(): boolean          // (authStateLoading || any other queries subclasses might do are loading)

  createUser(params: CreateUserParams): Promise<AuthResult>

  requestPasswordReset(email: string): Promise<AuthResult>
  resetPassword(oobCode: string, password: string): Promise<void>

  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

export default CoreAuthService
