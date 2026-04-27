"use client"

import { Button, Heading } from "@medusajs/ui"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Sommaire
      </Heading>
      <Divider />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href="/checkout?step=address"
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">Passer au paiement</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary