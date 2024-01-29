import {BorrowedModel} from "./borrowed.model";

export interface BookModel {
  id: number;
  Name: string;
  Author: string;
  Borrowed: BorrowedModel | null | undefined;
}

