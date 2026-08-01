import { ABSOLABS_SET, ARCANE_SHADE_SET } from "../model";

export interface CorrectableSetState {
  count: number;
  totalStarForce: number;
}

// 아케인셰이드 1종은 세트옵션이 활성되지 않아 앱솔랩스 1종으로 보정되고,
// 그 장비의 스타포스도 앱솔랩스 스타포스에 합산됨
// 아케인셰이드 2종부터는 세트옵션이 켜지므로 보정 해제됨
export function correctAbsolabsSet(
  arcaneShade: CorrectableSetState,
  absolabs: CorrectableSetState,
) {
  const applied =
    arcaneShade.count === 1 &&
    absolabs.count >= 1 &&
    absolabs.count < ABSOLABS_SET.maxSetCount;

  if (!applied) {
    return { ...absolabs, applied };
  }

  return {
    count: absolabs.count + 1,
    totalStarForce: absolabs.totalStarForce + arcaneShade.totalStarForce,
    applied,
  };
}

export const ABSOLABS_CORRECTION_SET_IDS = {
  source: ARCANE_SHADE_SET.id,
  target: ABSOLABS_SET.id,
} as const;

export const ABSOLABS_CORRECTION_NOTE =
  "아케인셰이드 1종 보정으로 앱솔랩스에 1종과 스타포스가 합산됨";
