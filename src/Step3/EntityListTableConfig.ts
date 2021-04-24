import TableConfig, {TableColumnConfig} from "./TableConfig";
import getClassForItem from "./EntityRowClassResolver";

class EntityListTableConfig extends TableConfig {

  constructor() {
    super([
      new TableColumnConfig('name', 'Name'),
      new TableColumnConfig('email', 'Email'),
      new TableColumnConfig('date', 'Next contact date'),
    ], 'table', getClassForItem)
  }
}

export default EntityListTableConfig