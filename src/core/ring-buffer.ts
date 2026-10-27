/** Tampon circulaire de taille fixe : les plus anciennes valeurs sont écrasées. */
export class RingBuffer {
  private readonly data: number[] = [];
  private start = 0;

  constructor(readonly capacity: number) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError('capacity doit être un entier ≥ 1');
    }
  }

  get length(): number {
    return this.data.length;
  }

  push(value: number): void {
    if (this.data.length < this.capacity) {
      this.data.push(value);
    } else {
      this.data[this.start] = value;
      this.start = (this.start + 1) % this.capacity;
    }
  }

  clear(): void {
    this.data.length = 0;
    this.start = 0;
  }

  /** Valeurs dans l'ordre chronologique (la plus ancienne en premier). */
  toArray(): number[] {
    return [...this.data.slice(this.start), ...this.data.slice(0, this.start)];
  }
}

/**
 * Construit l'attribut `points` d'une polyligne SVG.
 * Les valeurs sont réparties sur toute la largeur et bornées à [min, max].
 * Les valeurs non finies sont ignorées.
 */
export function buildPolyline(values: readonly number[], min: number, max: number, width: number, height: number): string {
  const finite = values.filter(Number.isFinite);
  if (finite.length === 0 || !(max > min)) return '';
  const step = finite.length > 1 ? width / (finite.length - 1) : 0;
  return finite
    .map((v, i) => {
      const c = Math.min(Math.max(v, min), max);
      const x = i * step;
      const y = height - ((c - min) / (max - min)) * height;
      return `${round(x)},${round(y)}`;
    })
    .join(' ');
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
