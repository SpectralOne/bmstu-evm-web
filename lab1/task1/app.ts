import { Kid } from './kid';

const vowel: string = "aeouiy";

export function push_kid(arr: Kid[], surname: string, age: number): void {
  if (!arr.filter((instance) => instance.surname === surname).length) {
    arr.push({ surname, age } as Kid);
  }
}

export function get_kid(arr: Kid[], surname: string): Kid | null {
  const result: Kid[] = arr.filter((instance) => instance.surname === surname);
  if (result.length) {
    return result[0];
  } else {
    return null;
  }
}

export function update_kid(arr: Kid[], surname: string, age: number): void {
  const instance = get_kid(arr, surname);
  if (instance) {
    instance.surname = surname;
    instance.age = age;
  }
}

export function delete_kid(arr: Kid[], surname: string): void {
  const instance = get_kid(arr, surname);
  if (instance) {
    const idx = arr.indexOf(instance);
    arr.splice(idx, 1);
  }
}

export function get_average(arr: Kid[]): number | null {
  if (!arr.length) {
    return null;
  }

  return arr.reduce((a, { age }) => a + age, 0) / arr.length;
}

export function get_oldest(arr: Kid[]): Kid | null {
  if (!arr.length) {
    return null;
  }

  return arr.reduce((prev, current) => (prev.age > current.age) ? prev : current)
}

export function get_range(arr: Kid[], low: number, high: number): Kid[] {
  return arr.filter((instance) => instance.age >= low && instance.age <= high);
}

export function surname_starts_with(arr: Kid[], char: string): Kid[] | null {
  if (char.length > 1) {
    return null;
  }
  return arr.filter((instance) => instance.surname.startsWith(char));
}

export function surname_longest_than(arr: Kid[], len: number): Kid[] {
  return arr.filter((instance) => instance.surname.length > len);
}

export function surname_starts_vowel(arr: Kid[]): Kid[] {
  return arr.filter((instance) => vowel.includes(instance.surname.toLowerCase().charAt(0)));
}
