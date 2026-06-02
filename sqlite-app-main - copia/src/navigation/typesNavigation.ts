import { Pet } from '../types/pet';

export type RootStackParamList = {
  List: undefined;
  Form: undefined;
  Detail: { pet: Pet };
  Stats: undefined;
};