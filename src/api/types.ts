type FilterOp = 'eq' | 'ne' | 'more' | 'less' | 'like_before' | 'like_after' | 'like_both'

type Attribute = string

type ListDetails = {
  attributes: Attribute[];
  order: {
    attr: string;
    asc: boolean;
  }
  filters?: {
    attr: string;
    value: string;
    op: FilterOp;
  }
  size?: number;
  offset?: number;
}

type DocumentAttributes = {
  [key: Attribute]: string | number | null
}

type ListResponse = {
  size: number;
  offset: number;
  atributes: DocumentAttributes[];
}

type AttributesDescription = {
  [key: Attribute]: string;
}

export type { FilterOp, Attribute, ListDetails, DocumentAttributes, ListResponse, AttributesDescription }