export class TableColumnConfig {
  key: string
  title: string

  constructor(key: string, title: string) {
    this.key = key;
    this.title = title;
  }
}

export default class TableConfig {
  columns: TableColumnConfig[] = []
  className: string|undefined = undefined
  rowClassResolver: (arg: any) => (string | undefined);

  constructor(
    columns: TableColumnConfig[],
    className: string|undefined = undefined,
    rowClassResolver: (arg: any) => string | undefined = () => undefined
  ) {
    this.columns = columns;
    this.className = className;
    this.rowClassResolver = rowClassResolver;
  }
}