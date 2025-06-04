import { type FC, type FormEvent, useState, useEffect } from "react"
import { loginUserTC } from "@/features/user/userSlice.ts"

import s from "./UserStyles.module.css"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

type UserSignUpFormProps = {
  closeForm: () => void
  toggleFormHandler: (type: "signup" | "login") => void
  isShow: boolean
}

export const UserLoginForm: FC<UserSignUpFormProps> = ({
                                                         closeForm,
                                                         toggleFormHandler,
                                                         isShow
                                                       }) => {
  const dispatch = useAppDispatch()
  // const error = useAppSelector(state => state.user.error)
  const isLoading = useAppSelector(state => state.user.isLoading)

  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  const [formError, setFormError] = useState("")

  useEffect(() => {
    // Очищаем ошибку при открытии/закрытии формы
    setFormError("")
  }, [isShow])

  const handleChange = ({ target: { value, name } }: {
    target: { value: string, name: string }
  }) => {
    setValues({ ...values, [name]: value })
    // Очищаем ошибку при изменении полей
    if (formError) setFormError("")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Валидация полей
    if (!values.email || !values.password) {
      setFormError("Please fill in all fields")
      return
    }

    // Проверка формата email
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      setFormError("Please enter a valid email address")
      return
    }

    try {
      const resultAction = await dispatch(loginUserTC(values))

      if (loginUserTC.rejected.match(resultAction)) {
        // Ошибка из API
        setFormError(resultAction.payload as string || "Login failed")
      } else {
        // Успешный вход - закрываем форму
        closeForm()
      }
    } catch (err) {
      setFormError("An unexpected error occurred")
    }
  }

  return (
    <div className={`${s.wrapper} ${isShow ? s.wrapperVisible : ""}`}>
      <div className={s.close} onClick={closeForm}>
        <svg className={s.icon} width="14" height="14" viewBox="0 0 14 14" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M1.375 1.375L12.625 12.625" stroke="#576067" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
          <path d="M1.375 12.625L12.625 1.375" stroke="#576067" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
      </div>

      <div className={s.title}>Sign In</div>

      {/* Блок для отображения ошибок */}
      {formError && (
        <div className={s.error}>
          {formError}
        </div>
      )}

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.group}>
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
            className={s.input}
          />
        </div>

        <div className={s.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
            className={s.input}
          />
        </div>

        <div className={s.link} onClick={() => toggleFormHandler("signup")}>
          Create an account
        </div>

        <button
          type="submit"
          className={s.submit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  )
}