"use client"

import { HttpTypes } from "@medusajs/types"
import { StateType } from "@lib/hooks/use-toggle-state"

/**
 * CountrySelect
 * -----------------------------
 * Projet local : sélection de pays désactivée volontairement.
 *
 * La région est gérée implicitement (ex: Canada / Québec)
 * et ne doit pas être modifiée par l'utilisateur.
 *
 * Ce composant est conservé comme placeholder afin de :
 * - ne pas casser les imports existants
 * - permettre une réactivation future simple
 */
type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = (_props: CountrySelectProps) => {
  return null
}

export default CountrySelect
