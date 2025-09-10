"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheTag,
  setAuthToken,
} from "./cookies"

export interface OtpRequestResponse {
  success: boolean
  result: {
    sent: boolean
    phone: string
  }
}

export interface OtpVerifyResponse {
  token: string
  customer: {
    id: string
    phone: string
    email?: string
    first_name?: string
    last_name?: string
  }
  ok: boolean
}

export async function requestOtp(phone: string): Promise<OtpRequestResponse> {
  try {
    console.log("Requesting OTP for phone:", phone)
    
    const response = await sdk.client.fetch<OtpRequestResponse>(`/store/auth/otp/request`, {
      method: "POST",
      body: { phone }, // SDK akan otomatis stringify
    })
    
    console.log("OTP request successful:", response)
    return response
  } catch (error: any) {
    console.error("OTP request error:", error)
    
    // SDK client akan throw FetchError untuk non-2xx status
    if (error.status) {
      throw new Error(`HTTP ${error.status}: ${error.message || "Failed to send OTP"}`)
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Tidak dapat terhubung ke server. Pastikan backend berjalan.`)
    }
    
    throw new Error(error.message || "Failed to send OTP")
  }
}

export async function verifyOtp(phone: string, otp: string): Promise<OtpVerifyResponse> {
  try {
    console.log("Verifying OTP for phone:", phone, "OTP:", otp)
    
    const response = await sdk.client.fetch<OtpVerifyResponse>(`/store/auth/otp/verify`, {
      method: "POST",
      body: { phone, otp }, // SDK akan otomatis stringify
    })

    console.log("OTP verification successful:", response)
    return response
  } catch (error: any) {
    console.error("OTP verification error:", error)
    
    // SDK client akan throw FetchError untuk non-2xx status
    if (error.status) {
      throw new Error(`HTTP ${error.status}: ${error.message || "Invalid or expired OTP"}`)
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Tidak dapat terhubung ke server. Pastikan backend berjalan.`)
    }
    
    throw new Error(error.message || "Failed to verify OTP")
  }
}

export async function loginWithOtp(_currentState: unknown, formData: FormData) {
  const phone = formData.get("phone") as string
  const otp = formData.get("otp") as string

  if (!phone || !otp) {
    return "Phone number and OTP are required"
  }

  try {
    const result = await verifyOtp(phone, otp)
    
    if (result.ok && result.customer) {
      // Use Medusa SDK auth login for OTP with customer_id (required by service.ts)
      const customerId = result.customer.id
      
      try {
        const token = await sdk.auth.login("customer", "auth_otp", { 
          customer_id: customerId,
        })
        
        console.log("OTP Auth token received:", token)
        
        // The token should be a JWT token string
        await setAuthToken(token as string)
        console.log("OTP Auth token set successfully")
        const customerCacheTag = await getCacheTag("customers")
        console.log("Customer cache tag:", customerCacheTag)
        revalidateTag(customerCacheTag)
        
        // Transfer cart if needed
        try {
          await transferCart()
        } catch (error) {
          console.warn("Failed to transfer cart:", error)
        }
        
        return { success: true, customer: result.customer }
      } catch (authError: any) {
        console.error("Auth login error:", authError)
        return authError.message || "Authentication failed"
      }
    } else {
      return "Invalid OTP"
    }
  } catch (error: any) {
    return error.message || "Login failed"
  }
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

// Import getCartId from cookies
import { getCartId } from "./cookies"
