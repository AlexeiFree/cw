import type {
  LayoutCoordinates,
  SignalifyReadonly,
  SignalifyWritable,
} from '@/shared/types';

export interface AnnotationStateRaw {
  coords: LayoutCoordinates;
  text: string;
}

export interface AnnotationCreationData {
  coords: LayoutCoordinates;
}

export type AnnotationUpdateData = Partial<AnnotationStateRaw>;

export type AnnotationState = SignalifyReadonly<Readonly<AnnotationStateRaw>>;

export type AnnotationStateWritable = SignalifyWritable<
  Readonly<AnnotationStateRaw>
>;
