import type {
  LayoutCoordinates,
  Signalify,
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

export type AnnotationState = Signalify<Readonly<AnnotationStateRaw>>;

export type AnnotationStateWritable = SignalifyWritable<
  Readonly<AnnotationStateRaw>
>;
