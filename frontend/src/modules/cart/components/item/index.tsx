"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const MAX_QTY = 10

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /** Sécurisation de la quantité actuelle */
  const safeQuantity =
    typeof item.quantity === "number" &&
    item.quantity >= 1 &&
    item.quantity <= MAX_QTY
      ? item.quantity
      : 1

  const changeQuantity = async (quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return
    }

    setError(null)
    setUpdating(true)

    try {
      await updateLineItem({
        lineId: item.id,
        quantity,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Table.Row className="w-full" data-testid="product-row">
      {/* Image */}
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      {/* Titre / Variante */}
      <Table.Cell className="text-left">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {/* Quantité */}
      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center w-28">
            <DeleteButton
              id={item.id}
              data-testid="product-delete-button"
            />

            <CartItemSelect
              value={safeQuantity}
              onChange={(event) =>
                changeQuantity(Number(event.target.value))
              }
              className="w-14 h-10 p-4"
              disabled={updating}
              data-testid="product-select-button"
            >
              {Array.from({ length: MAX_QTY }, (_, i) => {
                const qty = i + 1
                return (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                )
              })}
            </CartItemSelect>

            {updating && <Spinner />}
          </div>

          <ErrorMessage
            error={error}
            data-testid="product-error-message"
          />
        </Table.Cell>
      )}

      {/* Prix unitaire */}
      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      {/* Total */}
      <Table.Cell className="!pr-0">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center":
              type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1">
              <Text className="text-ui-fg-muted">
                {safeQuantity}×
              </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}

          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
