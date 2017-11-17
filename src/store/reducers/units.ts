import { Map } from "immutable";

interface Unit {
  readonly owner: String;
  readonly count: Number;

}

const initialState = new Map();

export function addUnit(state, owner: String, count: Number) {
  return state.set("asd", new Unit({
    owner,
    count
  }))
}
