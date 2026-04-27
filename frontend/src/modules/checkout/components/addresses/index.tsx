"use client"

import { setAddresses } from "@lib/data/cart"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Input, Text } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import ErrorMessage from "@modules/checkout/components/error-message"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
        >
          Informations
          {!isOpen && cart?.email && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.email && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Modifier
            </button>
          </Text>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8 flex flex-col gap-y-4">

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <Input
                name="shipping_address.first_name"
                required
                placeholder="Jeannot Gauthier"
                defaultValue={cart?.shipping_address?.first_name ?? ""}
              />
              <input
                type="hidden"
                name="shipping_address.last_name"
                value=""
              />
            </div>

            {/* Courriel */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Courriel <span className="text-red-500">*</span>
              </label>
              <Input
                name="email"
                type="email"
                required
                placeholder="jgauthier@ville.becancour.qc.ca"
                defaultValue={cart?.email ?? ""}
              />
            </div>

            {/* Département */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Département <span className="text-red-500">*</span>
              </label>
              <Input
                name="shipping_address.company"
                required
                placeholder="Développement durable et planification"
                defaultValue={cart?.shipping_address?.company ?? ""}
              />
            </div>

            {/* Poste budgétaire */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Poste budgétaire <span className="text-red-500">*</span>
              </label>
              <Input
                name="shipping_address.address_2"
                required
                placeholder="02-191-00-670"
                defaultValue={cart?.shipping_address?.address_2 ?? ""}
              />
            </div>

            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Continuer
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div className="text-small-regular">
          {cart?.email ? (
            <div className="flex flex-col gap-y-2">
              <Text className="txt-medium text-ui-fg-subtle">
                <span className="font-medium">Nom :</span>{" "}
                {cart.shipping_address?.first_name}
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                <span className="font-medium">Courriel :</span> {cart.email}
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                <span className="font-medium">Département :</span>{" "}
                {cart.shipping_address?.company}
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                <span className="font-medium">Poste budgétaire :</span>{" "}
                {cart.shipping_address?.address_2}
              </Text>
            </div>
          ) : (
            <Text className="txt-medium text-ui-fg-subtle">
              Veuillez remplir vos informations.
            </Text>
          )}
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses