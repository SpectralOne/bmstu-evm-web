import { Student } from './student';

export function push_student(arr: Student[], group: string, card: string, grades: number[]): void {
  if (!arr.filter((instance) => instance.card === card).length) {
    arr.push({ group, card, grades } as Student);
  }
}

export function get_student(arr: Student[], card: string): Student | null {
  const result: Student[] = arr.filter((instance) => instance.card === card);
  if (result.length) {
    return result[0];
  } else {
    return null;
  }
}

export function update_student(arr: Student[], group: string, card: string, grades: number[]): void {
  const instance = get_student(arr, card);
  if (instance) {
    instance.group = group;
    instance.card = card;
    instance.grades = grades;
  }
}

export function delete_student(arr: Student[], card: string): void {
  const instance = get_student(arr, card);
  if (instance) {
    const idx = arr.indexOf(instance);
    arr.splice(idx, 1);
  }
}

export function get_average(arr: Student[], card: string): number | null {
  const instance = get_student(arr, card);
  if (!instance) {
    return null;
  }
  const idx = arr.indexOf(instance);
  if (!arr[idx].grades.length) {
    return null;
  }

  return arr[idx].grades.reduce((acc, g) => acc + g) / arr[idx].grades.length;
}

export function search_by_group(arr: Student[], group: string): Student[] {
  return arr.filter((instance) => instance.group === group);
}

export function most_grades(arr: Student[]): Student | null {
  if (!arr.length) {
    return null;
  }

  return arr.reduce((prev, current) => (prev.grades.length > current.grades.length) ? prev : current)
}

export function no_grades(arr: Student[]): Student[] {
  return arr.filter((instance) => instance.grades.length === 0);
}
