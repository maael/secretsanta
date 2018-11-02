interface ModelBase {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Elf {
  _id: string;
  name: string;
  email: string;
  address: string;
  hints?: string;
}

export interface Exclusion {
  elfOne: string;
  elfTwo: string;
}

export interface Pair {
  elfOne: string;
  elfOneNote: string;
  elfTwo: string;
  elfTwonote: string;
}

export interface SecretSanta extends ModelBase {
  name: string;
  santaId: string;
  elfs: Elf[];
  exclusions: Exclusion[];
  pairings: Pair[];
  budget: number;
  revealDate: Date;
  deadlineDate: Date;
}

export interface PromiseState<T> {
  pending: boolean;
  refreshing: boolean;
  fulfilled: boolean;
  rejected: boolean;
  settled: boolean;
  value: T;
  reason: Error | null;
  meta: any;
}
