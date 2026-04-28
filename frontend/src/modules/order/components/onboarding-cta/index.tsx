"use client"

import { resetOnboardingState } from "@lib/data/onboarding"
import { Button, Container, Text } from "@medusajs/ui"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  return (
    <Container className="max-w-4xl h-full bg-ui-bg-subtle w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <Text className="text-ui-fg-base text-xl">
          Votre commande de test a été créée avec succès ! 🎉
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular">
          Vous pouvez maintenant finaliser la configuration de votre boutique dans l’interface d’administration.
        </Text>
        <Button
          className="w-fit"
          size="xlarge"
          onClick={() => resetOnboardingState(orderId)}
        >
          Finaliser la configuration dans l’administration
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
