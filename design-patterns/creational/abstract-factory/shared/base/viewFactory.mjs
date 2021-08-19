import NotImplementedException from "../notImplementedException.mjs";

export default class ViewFactory {
  createtable() {
    throw new NotImplementedException(this.createtable.name);
  }
}
