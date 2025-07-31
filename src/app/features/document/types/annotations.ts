import type { LayoutCoordinates } from "@/shared/types";

export interface DocumentAnnotationData extends LayoutCoordinates {
  text: string;
}

export interface AnnotationDeleteEvent {
  needConfirmation?: boolean;
}
