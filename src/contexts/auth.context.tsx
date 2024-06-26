import { createContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ExtendedPurchase } from "src/types/purchase.type"
import { User } from "src/types/user.type"
import {
  getAccessTokenToLs,
  getDarkModeToLs,
  getLanguageToLS,
  getProfileToLs,
  setDarkModeToLs,
  setLanguageToLS
} from "src/utils/auth"

interface Props {
  children: React.ReactNode
  defaultValue?: TypeInitialState
}

interface TypeInitialState {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isProfile: User | null
  setIsProfile: React.Dispatch<React.SetStateAction<User | null>>
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}

// const initialState: TypeInitialState = {
//   isAuthenticated: Boolean(getAccessTokenToLs()), // lấy access_token từ ls ra và chuyển nó thành boolean
//   setIsAuthenticated: () => null,
//   isProfile: getProfileToLs(),
//   setIsProfile: () => null,
//   darkMode: getDarkModeToLs() === "true" ? true : false,
//   setDarkMode: () => null,
//   extendedPurchase: [],
//   setExtendedPurchase: () => null,
//   reset: () => null,
//   language: getLanguageToLS(),
//   setLanguage: () => null
// }

export const getInitialAppContext: () => TypeInitialState = () => ({
  isAuthenticated: Boolean(getAccessTokenToLs()), // lấy access_token từ ls ra và chuyển nó thành boolean
  setIsAuthenticated: () => null,
  isProfile: getProfileToLs(),
  setIsProfile: () => null,
  darkMode: getDarkModeToLs() === "true" ? true : false,
  setDarkMode: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null,
  language: getLanguageToLS(),
  setLanguage: () => null
})

const initialState = getInitialAppContext()

export const AppContext = createContext<TypeInitialState>(initialState)

// global state - Context Api - state toàn cục : redux cũng tương tự
export const AppProvider = ({ children, defaultValue = initialState }: Props) => {
  // truyền thêm props defaultValue để customize cái unit test kiểm thử
  // gán giá trị của defaultValue là initialState (khởi tạo), thay vào đó
  // như 1 initialState giá trị khởi tạo cho app
  const { i18n } = useTranslation("header")
  const [darkMode, setDarkMode] = useState<boolean>(defaultValue.darkMode)
  const [language, setLanguage] = useState<string>(defaultValue.language)

  useEffect(() => {
    setDarkModeToLs(darkMode.toString())
    setLanguageToLS(language)
  }, [darkMode, language])

  useEffect(() => {
    const isDarkMode = getDarkModeToLs() === "true"
    const isLanguageEn = getLanguageToLS()
    setDarkMode(isDarkMode)
    i18n.changeLanguage(isLanguageEn)
  }, [i18n])

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [isProfile, setIsProfile] = useState<User | null>(defaultValue.isProfile)
  // eslint-disable-next-line prettier/prettier
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(
    defaultValue.extendedPurchase
  )

  const reset = () => {
    setIsAuthenticated(false)
    setIsProfile(null)
    setExtendedPurchase([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isProfile,
        setIsProfile,
        darkMode,
        setDarkMode,
        extendedPurchase,
        setExtendedPurchase,
        reset,
        language,
        setLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// component này bao trùm cả app thì truyền 4 value này xuống, component cha thay đổi kéo theo component con
