type registerError = {
    email?: string,
    name?: string,
    password?: string
}

type loginError = {
    email?: string,
    password?: string
}


type ForgotPassword ={
  email:string,
    
}

type ResetPassword={
  email:string,
  signature:string,
  password:string,
  cpassword:string
}