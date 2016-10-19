export class VesselClass {
  // TODO:Make dynamic fields!!!!

  name: string;
  dnvClass: string;

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


}
