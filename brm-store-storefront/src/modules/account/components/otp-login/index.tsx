"use client"

import { useState, useRef, useEffect } from "react"
import { requestOtp } from "@lib/data/otp"
import { loginWithOtp } from "@lib/data/otp"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  onSuccess?: () => void
}

const OtpLogin = ({ onSuccess }: Props) => {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [otpMessage, otpFormAction] = useActionState(loginWithOtp, null)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    setIsLoading(true)
    try {
      const result = await requestOtp(phone)
      if (result.success) {
        setStep("otp")
        setCountdown(60) // 60 seconds countdown
      }
    } catch (error: any) {
      console.error("Error requesting OTP:", error)
      // Set error message to be displayed
      setPhoneError(error.message || "Gagal mengirim OTP. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters
    
    // Update the specific input with null check
    const currentInput = otpInputRefs.current[index]
    if (currentInput) {
      currentInput.value = value
    }

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = otpInputRefs.current[index + 1]
      if (nextInput) {
        nextInput.focus()
      }
    }

    // Auto-submit when all 6 digits are entered
    const otpValues = otpInputRefs.current.map(ref => ref?.value || "").join("")
    console.log("OTP values:", otpValues, "Length:", otpValues.length)
    
    if (otpValues.length === 6) {
      console.log("Auto-submitting form with OTP:", otpValues)
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        const firstInput = otpInputRefs.current[0]
        if (firstInput) {
          const form = firstInput.closest('form')
          console.log("Form found:", form)
          if (form) {
            // Update hidden otp input
            const otpInput = form.querySelector('input[name="otp"]') as HTMLInputElement
            console.log("OTP input found:", otpInput)
            if (otpInput) {
              otpInput.value = otpValues
              console.log("Updated OTP input value:", otpInput.value)
              // Submit form
              try {
                form.requestSubmit()
                console.log("Form submitted with requestSubmit")
              } catch (error) {
                console.log("requestSubmit failed, trying submit:", error)
                form.submit()
                console.log("Form submitted with submit")
              }
            }
          }
        }
      }, 100) // Small delay to ensure DOM is updated
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpInputRefs.current[index]?.value && index > 0) {
      const prevInput = otpInputRefs.current[index - 1]
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return
    
    setIsLoading(true)
    try {
      const result = await requestOtp(phone)
      if (result.success) {
        setCountdown(60)
        // Clear OTP inputs with null check
        otpInputRefs.current.forEach(ref => {
          if (ref) {
            ref.value = ""
          }
        })
        // Focus first input with null check
        const firstInput = otpInputRefs.current[0]
        if (firstInput) {
          firstInput.focus()
        }
      }
    } catch (error: any) {
      console.error("Error resending OTP:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToPhone = () => {
    setStep("phone")
    setPhone("")
    setCountdown(0)
    // Clear OTP inputs with null check
    otpInputRefs.current.forEach(ref => {
      if (ref) {
        ref.value = ""
      }
    })
  }

  // Handle successful login
  useEffect(() => {
    if (otpMessage && typeof otpMessage === "object" && "success" in otpMessage && otpMessage.success) {
      console.log("Login successful:", otpMessage)
      // Add small delay to show success message before redirect
      setTimeout(() => {
        onSuccess?.()
      }, 1000)
    }
  }, [otpMessage, onSuccess])

  if (step === "phone") {
    return (
      <div className="max-w-sm w-full flex flex-col items-center" data-testid="otp-phone-page">
        <div className="w-full mb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-ui-fg-interactive to-ui-fg-interactive-hover rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h1 className="text-large-semi uppercase mb-2 bg-gradient-to-r from-ui-fg-base to-ui-fg-subtle bg-clip-text text-transparent">
            Masuk dengan WhatsApp
          </h1>
          <p className="text-center text-base-regular text-ui-fg-base">
            Masukkan nomor WhatsApp Anda untuk menerima kode verifikasi
          </p>
        </div>

        <form className="w-full" onSubmit={handlePhoneSubmit}>
          <div className="flex flex-col w-full gap-y-4">
            <Input
              label="Nomor WhatsApp"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (phoneError) setPhoneError(null) // Clear error when user types
              }}
              title="Masukkan nomor WhatsApp dengan format internasional"
              autoComplete="tel"
              required
              data-testid="phone-input"
            />
          </div>
          
          {phoneError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{phoneError}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading || !phone.trim()}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors ${
              isLoading || !phone.trim()
                ? "bg-ui-bg-disabled text-ui-fg-disabled cursor-not-allowed"
                : "bg-ui-button-inverted text-ui-button-inverted-fg hover:bg-ui-button-inverted-hover"
            }`}
            data-testid="request-otp-button"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Mengirim...
              </div>
            ) : (
              "Kirim Kode OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-small-regular text-ui-fg-muted">
            Dengan melanjutkan, Anda menyetujui{" "}
            <a href="/terms" className="underline hover:text-ui-fg-base">
              Syarat & Ketentuan
            </a>{" "}
            dan{" "}
            <a href="/privacy" className="underline hover:text-ui-fg-base">
              Kebijakan Privasi
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center" data-testid="otp-verification-page">
      <div className="w-full mb-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-large-semi uppercase mb-2 bg-gradient-to-r from-ui-fg-base to-ui-fg-subtle bg-clip-text text-transparent">
          Verifikasi OTP
        </h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-2">
          Masukkan 6 digit kode yang dikirim ke
        </p>
        <p className="text-center text-base-regular text-ui-fg-subtle font-medium bg-ui-bg-subtle px-3 py-1 rounded-lg inline-block">
          {phone}
        </p>
      </div>

      <form className="w-full" action={otpFormAction}>
        <input type="hidden" name="phone" value={phone} />
        <input type="hidden" name="otp" value="" />
        
        <div className="flex flex-col w-full gap-y-4">
          <div className="flex justify-center gap-2 sm:gap-3 mb-4">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpInputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border border-ui-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-fg-interactive focus:border-transparent bg-ui-bg-field hover:bg-ui-bg-field-hover transition-colors"
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoComplete="one-time-code"
                data-testid={`otp-input-${index}`}
              />
            ))}
          </div>
        </div>

        <ErrorMessage error={typeof otpMessage === "string" ? otpMessage : null} data-testid="otp-error-message" />
        
        {otpMessage && typeof otpMessage === "object" && "success" in otpMessage && otpMessage.success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">Login berhasil! Mengalihkan...</p>
          </div>
        )}

        <SubmitButton 
          data-testid="verify-otp-button" 
          className="w-full mt-6"
        >
          Verifikasi OTP
        </SubmitButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-small-regular text-ui-fg-muted mb-2">
          Tidak menerima kode?
        </p>
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={countdown > 0 || isLoading}
          className={`text-small-regular transition-colors ${
            countdown > 0 || isLoading
              ? "text-ui-fg-disabled cursor-not-allowed"
              : "text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline hover:no-underline"
          }`}
          data-testid="resend-otp-button"
        >
          {countdown > 0 ? (
            <span className="flex items-center justify-center gap-1">
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
              Kirim ulang dalam {countdown}s
            </span>
          ) : (
            "Kirim ulang kode"
          )}
        </button>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleBackToPhone}
          className="text-small-regular text-ui-fg-muted hover:text-ui-fg-base underline"
          data-testid="back-to-phone-button"
        >
          Ubah nomor WhatsApp
        </button>
      </div>
    </div>
  )
}

export default OtpLogin
