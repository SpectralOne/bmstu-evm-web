export class Triangle {
  constructor(
    private A: number,
    private B: number,
    private C: number
  ) { }

  check(): boolean {
    return this.A + this.B > this.C && 
           this.A + this.C > this.B && 
           this.B + this.C > this.A;
  }

  area(): number {
    const p: number = this.perimeter() / 2;
    return Math.sqrt(
      p * (p - this.A) * (p - this.B) * (p - this.C)
    );
  }

  perimeter(): number {
    return this.A + this.B + this.C;
  }

  is_right_angled(): boolean {
    const a: number = Math.pow(this.A, 2);
    const b: number = Math.pow(this.B, 2);
    const c: number = Math.pow(this.C, 2);

    return Math.max(a, b, c) === (a + b + c - Math.max(a, b, c));
  }
}
