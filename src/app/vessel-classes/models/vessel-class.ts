export class VesselClass {
  // TODO:Make dynamic fields!!!!

  name: string;

  key: any;

  speed: number;
  range: number;
  tonnageGross: number;
  tonnageNet: number;

  // main dimension
  length: number;
  beam: number;
  draft: number;

  // Tank capacity
  bunkerOil: number;
  ballastWater: number;
  freshWater: number;

  //Bollard Pull
  maxPull: number;
  towingHook: number;

  // Engines
  mainEngine: string;
  auxEngine: string;

  // Propulsion
  gear: string;
  controllablePitchProps: string;
  bowThrust: string;
  waterJet: string;

  // Crew
  crew: number

  // Design by
  design: string;

  constructionMaterial: string;

  rescueAccommodation: string;
}
