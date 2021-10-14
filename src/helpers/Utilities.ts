import { BaseCSVType, BlipType, MappingType, TechKey } from '../types';

// taken from https://gist.github.com/codeguy/6684588
const createSlug = (str: string, separator = '-'): string =>
  str
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);

const cleanupStringArray = (arr: string[]): string[] => arr.map((t) => t.trim());

const cleanRawBlips = <T>(rawBlips: BaseCSVType[], mapping: MappingType<T>): T[] => {
  console.log(rawBlips, mapping);
  return [...(rawBlips || [])].map(mapping);
};

const checkItemHasTechFromMultiple = (item: BlipType | null, tech: string, techKey: TechKey): boolean => {
  if (item === null) return false;
  // check if techFilter was selected
  const sluggedTechs: string[] = [];
  const itemTechs: string[] = item[techKey] as string[];
  itemTechs.forEach((t) => sluggedTechs.push(createSlug(t)));
  return sluggedTechs.includes(tech);
};

export const Utilities = {
  createSlug,
  cleanRawBlips,
  cleanupStringArray,
  checkItemHasTechFromMultiple,
};
