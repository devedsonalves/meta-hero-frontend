export interface RegisterBody {
  name: string
  email: string
  password: string
}

export interface RegisterFormBody extends RegisterBody {
  confirmEmail: string
}
