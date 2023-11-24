import { selector } from "recoil";
import { statusState, genderState } from "../atom";
export const status = selector({
  key: "status",
  get: ({ get }) => {
    const status = get(statusState);

    return status;
  },
});
export const gender = selector({
  key: "gender",
  get: ({ get }) => {
    const status = get(genderState);

    return status;
  },
});
