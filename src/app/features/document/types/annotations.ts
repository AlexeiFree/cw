import type {
  LayoutCoordinates,
  ReadonlySignals,
  WritableSignals,
} from '@/shared/types';

export interface AnnotationStateRaw {
  coords: LayoutCoordinates;
  text: string;
}

export interface AnnotationCreationData {
  coords: LayoutCoordinates;
}

export type AnnotationUpdateData = Partial<AnnotationStateRaw>;

export type AnnotationState = ReadonlySignals<Readonly<AnnotationStateRaw>>;

export type AnnotationStateWritable = WritableSignals<
  Readonly<AnnotationStateRaw>
>;
