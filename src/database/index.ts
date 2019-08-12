/* tslint:disable */
import Dexie from "dexie";
import { RawDraftContentState } from "draft-js";

export type Novel = {
  id: number;
  title: string;
  author: string;
  parts: RawDraftContentState[];
};

class WLDatabase extends Dexie {
  novels: Dexie.Table<Novel, number>;

  constructor() {
    super("WriterLighter");
    this.version(1).stores({
      novels: "++id,title,author"
    });
    this.novels = this.table("novels");
  }
}

const database = new WLDatabase();

export default database;
