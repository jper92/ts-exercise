import { Claim, Insurer } from "./example";

// we assume all insurers have enough money to cover all claims
// we assume all insurers have some money
export function processClaims(
  claims: Claim[],
  insurers: Insurer[],
  claimIndex = 0,
  insurerIndex = 0,
  insurersResult: Record<number, number[]> = {}
): Record<number, number[]> {
  const currentInsurer = insurers[insurerIndex];
  const currentClaim = claims[claimIndex];
  const balanceToClaim = currentClaim.amount;
  const toPayByInsurer = Math.min(currentInsurer.money, balanceToClaim);
  const balancePending = balanceToClaim - toPayByInsurer;
  // update values
  currentClaim.amount -= toPayByInsurer;
  currentInsurer.money -= toPayByInsurer;
  const existingClaimInsurers = insurersResult[currentClaim.id] ?? [];
  existingClaimInsurers.push(currentInsurer.id);
  insurersResult[currentClaim.id] = existingClaimInsurers;
  if (balancePending) {
    return processClaims(
      claims,
      insurers,
      claimIndex,
      insurerIndex + 1,
      insurersResult
    );
  } else if (claimIndex === claims.length - 1) {
    return insurersResult;
  } else {
    const newInsurerIndex = currentInsurer.money
      ? insurerIndex
      : insurerIndex + 1;
    return processClaims(
      claims,
      insurers,
      claimIndex + 1,
      newInsurerIndex,
      insurersResult
    );
  }
}
