interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

// Copia el objeto "CoursePartBase" y le agregá el campo "description" en este nuevo objeto ("ParteCursoConDescripcion").
interface ParteCursoConDescripcion extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends ParteCursoConDescripcion {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends ParteCursoConDescripcion {
  backgroundMaterial: string;
  kind: "background";
}

export interface ParteCursoSpecial extends ParteCursoConDescripcion {
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | ParteCursoSpecial;

