import { Point } from './point';

export function push_point(arr: Point[], name: string, x: number, y: number): void {
  if (!arr.filter((instance) => instance.name === name).length) {
    arr.push({ name, x, y } as Point);
  }
}

export function get_point(arr: Point[], name: string): Point | null {
  const result: Point[] = arr.filter((instance) => instance.name === name);
  if (result.length) {
    return result[0];
  } else {
    return null;
  }
}

export function update_point(arr: Point[], name: string, x: number, y: number): void {
  const instance = get_point(arr, name);
  if (instance) {
    instance.name = name;
    instance.x = x;
    instance.y = y;
  }
}

export function delete_point(arr: Point[], name: string): void {
  const instance = get_point(arr, name);
  if (instance) {
    const idx = arr.indexOf(instance);
    arr.splice(idx, 1);
  }
}

export function calc_dist(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
}

export function two_distant(arr: Point[]): Point[] {
  let max_dist: number = -1.;
  let result: Point[] = [];
  for (let first = 0; first < arr.length; first++) {
    const p1: Point = arr[first];
    for (let second = 0; second < arr.length; second++) {
      const p2: Point = arr[second];
      const dist: number = calc_dist(p1, p2);
      if (dist > max_dist) {
        result = [];
        result.push(p1, p2);
        max_dist = dist;
      }
    }
  }
  return result;
}

export function filter_by_max_dist(arr: Point[], p: Point, max_dist: number): Point[] {
  return arr.filter((instance) => calc_dist(p, instance) <= max_dist);
}

export function above_x(arr: Point[]): Point[] {
  return arr.filter((instance) => instance.y > 0);
}

export function below_x(arr: Point[]): Point[] {
  return arr.filter((instance) => instance.y < 0);
}

export function left_y(arr: Point[]): Point[] {
  return arr.filter((instance) => instance.x < 0);
}

export function right_y(arr: Point[]): Point[] {
  return arr.filter((instance) => instance.x > 0);
}

export function inside_rect(p: Point, rect: Point[]): boolean {
  return p.x >= rect[0].x && p.x <= rect[1].x && p.y >= rect[0].y && p.y <= rect[1].y;
}

export function inside_rect_area(arr: Point[], rect: Point[]): Point[] | null {
  if (!rect.length) {
    return null;
  }

  return arr.filter((instance) => inside_rect(instance, rect) === true);
}
