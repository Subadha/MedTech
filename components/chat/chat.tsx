import { atom, useAtom } from "jotai";


const configAtom = atom<any>({
  selected: null,
  name: '',
  type: ""
});

export function useMail() {
  return useAtom(configAtom);
}
