import { type FC, type FormEvent, useState } from "react"
import { loginUserTC } from "@/features/user/userSlice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type UserSignUpFormProps = {
  closeForm: () => void
  toggleFormHandler:(type:string)=>void
}

export const UserLoginForm: FC<UserSignUpFormProps> = ({ closeForm,toggleFormHandler }) => {
  const dispatch = useAppDispatch()
  const [values, setValues] = useState<{email:string,password:string}>({
    email: "",
    password: ""
  })
  const handleChange = ({ target: { value, name } }: { target: { value: string, name: string } }) => {
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isEmpty = Object.values(values).some(val => !val)
    if (isEmpty) return
    dispatch(loginUserTC(values))
    closeForm()
  }
  return (
    <div className={"wrapper"}>
      <div className="close" onClick={closeForm}>
        <svg className="icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.375 1.375L12.625 12.625" stroke="#576067" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
          <path d="M1.375 12.625L12.625 1.375" stroke="#576067" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
      </div>

      <div className="title">Sign In</div>
      <form className={"form"} onSubmit={handleSubmit}>
        <div className="group">
          <input type="email"
                 placeholder="Your Email"
                 name="email"
                 value={values.email}
                 autoComplete="off"
                 onChange={handleChange}
                 required
          />
        </div>


        <div className="group">
          <input type="password"
                 placeholder="Your password"
                 name="password"
                 value={values.password}
                 autoComplete="off"
                 onChange={handleChange}
                 required
          />
        </div>


        <div className="link" onClick={()=>toggleFormHandler("signup")}>Create an account</div>
        <button type="submit" className="submit">Login</button>
      </form>
    </div>
  )
}

