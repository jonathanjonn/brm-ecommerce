"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import OtpLogin from "@modules/account/components/otp-login"
import Login from "@modules/account/components/login"
import Register from "@modules/account/components/register"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  OTP_LOGIN = "otp-login",
}

const OtpLoginTemplate = () => {
  const [currentView, setCurrentView] = useState(LOGIN_VIEW.OTP_LOGIN)
  const router = useRouter()

  const handleOtpSuccess = () => {
    // Redirect to account page or home page after successful login
    router.push("/account")
  }

  return (
    <div className="w-full flex justify-center px-8 py-8">
      <div className="w-full max-w-md">
        {currentView === LOGIN_VIEW.SIGN_IN ? (
          <Login setCurrentView={setCurrentView} />
        ) : currentView === LOGIN_VIEW.REGISTER ? (
          <Register setCurrentView={setCurrentView} />
        ) : (
          <div>
            <OtpLogin onSuccess={handleOtpSuccess} />
            
            <div className="mt-8 pt-6 border-t border-ui-border-base">
              <div className="text-center">
                <p className="text-small-regular text-ui-fg-muted mb-4">
                  Atau masuk dengan cara lain
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                    className="w-full py-3 px-4 border border-ui-border-base rounded-lg text-base-regular hover:bg-ui-bg-subtle transition-colors"
                    data-testid="email-login-button"
                  >
                    Masuk dengan Email
                  </button>
                  <button
                    onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                    className="w-full py-3 px-4 border border-ui-border-base rounded-lg text-base-regular hover:bg-ui-bg-subtle transition-colors"
                    data-testid="register-button"
                  >
                    Daftar Akun Baru
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OtpLoginTemplate
