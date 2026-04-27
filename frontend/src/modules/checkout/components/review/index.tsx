"use client"

import { initiatePaymentSession, placeOrder, setShippingMethod } from "@lib/data/cart"
import { Button } from "@medusajs/ui"
import { useState } from "react"
import ErrorMessage from "../error-message"

const Review = ({ cart, shippingMethods, paymentMethods }: { 
  cart: any
  shippingMethods: any[]
  paymentMethods: any[]
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isReady = cart?.shipping_address && cart?.email

  const handlePlaceOrder = async () => {
    setSubmitting(true)
    try {
      // Auto-sélectionner la livraison si pas encore fait
      if (shippingMethods.length > 0 && !cart.shipping_methods?.length) {
        await setShippingMethod({
          cartId: cart.id,
          shippingMethodId: shippingMethods[0].id,
        })
      }

      // Initialiser le paiement manuel
      const activeSession = cart.payment_collection?.payment_sessions?.find(
        (s: any) => s.status === "pending"
      )
      if (!activeSession && paymentMethods.length > 0) {
        await initiatePaymentSession(cart, {
          provider_id: paymentMethods[0].id,
        })
      }

      await placeOrder()
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isReady) return null

  return (
    <div className="bg-white">
      <Button
        disabled={submitting}
        isLoading={submitting}
        onClick={handlePlaceOrder}
        size="large"
        data-testid="submit-order-button"
      >
        Placer la commande
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="payment-error-message"
      />
    </div>
  )
}

export default Review