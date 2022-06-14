export type TCarModel = {
  id: number;
  name: string;
};

export type TCar = {
  id: number;
  name: string;
  model: TCarModel;
  color: string;
  year: number;
  image: string;
};

export type TCarWithoutID = Omit<TCar, 'id'>;
