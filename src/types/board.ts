export interface Board {
  id: number;
  code: string;
  boardCreatedDate: string;
  name: string | undefined;
}

export interface Game {
  id: number;
  code: string;
  [key: string]: unknown;
}


export interface Column {
  id: string;
  label: string;
  total?: number;
  max?: number;
  width?: string;
  align?: 'center';
  format?: (value: number) => string;
}
