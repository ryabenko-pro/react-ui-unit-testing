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
  classResolver: (arg: any) => (string | undefined);

  constructor(
    columns: TableColumnConfig[],
    classResolver: (arg: any) => string | undefined = () => undefined
  ) {
    this.columns = columns;
    this.classResolver = classResolver;
  }
}