"use client"

import React from "react"
import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { toast } from "@medusajs/ui"
import { linkEmailPassword } from "@lib/data/customer"


type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [state, formAction] = React.useActionState(linkEmailPassword, {
    success: false,
    error: null as any,
  })
  
  // Show success toast when linking succeeds
  React.useEffect(() => {
    if (state.success) {
      const message = state.message || "Email dan password berhasil ditautkan"
      toast.success(message)
      
      // Show additional note if available
      if ('note' in state && state.note) {
        setTimeout(() => {
          toast.info(String(state.note))
        }, 2000)
      }
    }
  }, [state.success, state.message, 'note' in state ? state.note : null])

  const clearState = () => {}

  const isOtpOnly = !customer?.email

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Password"
        currentInfo={
          <span>
            {isOtpOnly
              ? "Tambahkan email + password untuk login alternatif."
              : "Ubah password akun email Anda (coming soon)."}
          </span>
        }
        isSuccess={!!state.success}
        isError={!!state.error}
        errorMessage={state.error as any}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        {isOtpOnly ? (
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Email baru"
              name="email"
              type="email"
              required
              data-testid="emailpass-email-input"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                name="password"
                data-testid="emailpass-password-input"
                required
              />
              <Input
                label="Konfirmasi password"
                type="password"
                name="confirm_password"
                data-testid="emailpass-confirm-password-input"
                required
              />
            </div>
            <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
              <strong>📋 Status implementasi saat ini:</strong><br/>
              ✅ <strong>Tambah email + password</strong>: Form sudah siap<br/>
              🚧 <strong>Login email+password</strong>: Backend masih dalam pengembangan<br/>
              <em>Email akan ditambahkan ke akun, namun auth provider identity masih dalam pengembangan.</em>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Password lama"
              name="old_password"
              type="password"
              disabled
            />
            <Input label="Password baru" name="new_password" type="password" disabled />
            <Input
              label="Konfirmasi password"
              name="confirm_password"
              type="password"
              disabled
            />
            <p className="col-span-2 text-sm text-gray-600">
              Fitur ubah password akan ditambahkan setelah tautan email+password stabil.
            </p>
          </div>
        )}
      </AccountInfo>
    </form>
  )
}

export default ProfilePassword
