import { Pet } from '../types/pet';

export type RootStackParamList = {
  Home: undefined; 
  List: undefined;
  Form: undefined;
  Detail: { pet: Pet };
  Stats: undefined;
};