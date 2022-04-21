// they file a claim
//

export interface Claim {
  id: number;
  amount: number;
}

export interface Insurer {
  id: number;
  money: number;
}

export function processClaim(claims: Claim[], insurers: Insurer[]) {
  // an insurer can pay multiple claims
  // for each claim: which insurer I sleect
  const insurersResult: Record<number, number[]> = {};
  if (insurers.length === 0) {
    return {};
  }

  let currentInsurerIndex = 0;
  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];
    let balanceToClaim = claim.amount;
    while (balanceToClaim > 0) {
      let currentInsurer = insurers[currentInsurerIndex];
      if (currentInsurer.money > 0) {
        const toPayByInsurer = Math.min(currentInsurer.money, balanceToClaim);
        balanceToClaim -= toPayByInsurer;
        const currentInsurers = insurersResult[claim.id] ?? [];
        currentInsurer.money -= toPayByInsurer;
        currentInsurers.push(currentInsurer.id);
        insurersResult[claim.id] = currentInsurers;
      } else {
        currentInsurerIndex++;
      }
    }
  }
  return insurersResult;
}
