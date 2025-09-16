"use client"

import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline"

type SKUDisplayProps = {
  variant?: HttpTypes.StoreProductVariant
  product?: HttpTypes.StoreProduct
  showCopy?: boolean
  size?: "small" | "medium" | "large"
  className?: string
}

const SKUDisplay = ({
  variant,
  product,
  showCopy = true,
  size = "medium",
  className = "",
}: SKUDisplayProps) => {
  const [copied, setCopied] = useState(false)

  // Get SKU from variant or fallback to product info
  const sku = variant?.sku || product?.variants?.[0]?.sku

  if (!sku) {
    return null
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sku)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy SKU:", err)
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-xs"
      case "large":
        return "text-base"
      default:
        return "text-sm"
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <Text className={`text-ui-fg-muted font-mono ${getSizeClasses()}`}>
          SKU:
        </Text>
        <Text
          className={`font-mono font-medium ${getSizeClasses()}`}
          data-testid="product-sku"
        >
          {sku}
        </Text>
      </div>

      {showCopy && (
        <button
          onClick={handleCopy}
          className="text-ui-fg-muted hover:text-ui-fg-base transition-colors p-1 rounded hover:bg-ui-bg-base-hover"
          title={copied ? "SKU copied!" : "Copy SKU"}
          type="button"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-600" />
          ) : (
            <ClipboardDocumentIcon className="w-4 h-4" />
          )}
        </button>
      )}

      {copied && (
        <Text className="text-xs text-green-600 animate-fade-in">Copied!</Text>
      )}
    </div>
  )
}

export default SKUDisplay
