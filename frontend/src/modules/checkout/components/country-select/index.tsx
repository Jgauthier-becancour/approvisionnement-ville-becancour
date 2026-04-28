"use client"

import { forwardRef } from "react"
import { HttpTypes } from "@medusajs/types"
import { NativeSelectProps } from "@modules/common/components/native-select"

/**
 * CountrySelect
 * ----------------------------------
 * Projet local : la sélection du pays est désactivée volontairement.
 *
 * - Une seule région/country est utilisée (ex: Canada / Québec)
 * - Aucun changement de pays autorisé via l'interface
 * - Ce composant retourne null pour éviter :
 *   - le rendu d’un <select>
 *   - l’apparition d’une flèche inutile
 *   - toute confusion utilisateur
 *
 * Le fichier est conservé pour :
 * - ne pas casser les imports existants
 * - permettre une réactivation future simple si nécessaire
 */
const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(() => {
  return null
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
