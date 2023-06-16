import { IPaginationInput } from '../common/pagination.interface';

export interface IFindAllUserInput extends IPaginationInput {
  name?: string;
}
