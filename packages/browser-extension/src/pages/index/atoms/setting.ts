import { atom } from "jotai";

export const preserveLogAtom = atom<boolean>(false);

export const searchAtom = atom<boolean>(false);

interface SearchSettings {
  value: string;
  case: boolean;
  regexp: boolean;
}
export const searchSettingsAtom = atom<SearchSettings>({
  value: "",
  case: false,
  regexp: false,
});

export const updateSearchValueAtom = atom<null, string>(
  null,
  (get, set, update) => {
    const searchSettings = get(searchSettingsAtom);
    set(searchSettingsAtom, { ...searchSettings, value: update });
  }
);

export const updateSearchCaseAtom = atom<null, boolean>(
  null,
  (get, set, update) => {
    const searchSettings = get(searchSettingsAtom);
    set(searchSettingsAtom, { ...searchSettings, case: update });
  }
);

export const updateSearchRegexpAtom = atom<null, boolean>(
  null,
  (get, set, update) => {
    const searchSettings = get(searchSettingsAtom);
    set(searchSettingsAtom, { ...searchSettings, regexp: update });
  }
);

export const filterAtom = atom<boolean>(true);

interface FilterSettings {
  value: string;
  invert: boolean;
  tag: string[];
}
export const filterSettingsAtom = atom<FilterSettings>({
  value: "",
  invert: false,
  tag: [],
});

export const updateFilterValueAtom = atom<null, string>(
  null,
  (get, set, update) => {
    const filterSettings = get(filterSettingsAtom);
    set(filterSettingsAtom, { ...filterSettings, value: update });
  }
);

export const updateFilterInvertAtom = atom<null, boolean>(
  null,
  (get, set, update) => {
    const filterSettings = get(filterSettingsAtom);
    set(filterSettingsAtom, { ...filterSettings, invert: update });
  }
);

export const updateFilterTagAtom = atom<null, string[]>(
  null,
  (get, set, update) => {
    const filterSettings = get(filterSettingsAtom);
    set(filterSettingsAtom, { ...filterSettings, tag: update });
  }
);
