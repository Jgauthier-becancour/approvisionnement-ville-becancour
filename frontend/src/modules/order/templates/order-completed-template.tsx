import { Heading, Text } from "@medusajs/ui"
import Items from "@modules/order/components/items"
import CartTotals from "@modules/common/components/cart-totals"
import OrderDetails from "@modules/order/components/order-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        <div
          className="flex flex-col gap-6 max-w-4xl h-full bg-white w-full py-10 px-6"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>Merci pour votre commande !</span>
          </Heading>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <Text className="text-ui-fg-base text-lg">
              📧 Vous allez recevoir un courriel lorsque votre commande sera prête.
            </Text>
            <Text className="text-ui-fg-subtle mt-2">
              Vous pourrez ensuite venir récupérer votre commande au magasin municipal de Bécancour.
            </Text>
          </div>

          <OrderDetails order={order} />

          <Heading level="h2" className="flex flex-row text-3xl-regular">
            Sommaire de la commande
          </Heading>
          <Items order={order} />
          <CartTotals totals={order} />
        </div>
      </div>
    </div>
  )
}