import { SetEffectCalculator } from "./SetEffectCalculator";

export function SetEffectCalculatorPage() {
  return (
    <section className="space-y-3">
      <h2 className="sr-only">세트 옵션 계산기</h2>
      <p className="sr-only">
        장비 세트 효과와 스타포스 효과를 계산하여 비교합니다.
      </p>
      <SetEffectCalculator />
    </section>
  );
}
