const { z } = require("zod");

const announceSchema = z.object({
  brand: z.string({ required_error: "La marque est requise" }),
  model: z.string({ required_error: "Le modèle du véhicule est requis" }),
  informations: z.object({
    dateCirculation: z.string({
      required_error: "La date de mise en circulation est requise",
    }),
    carBody: z.string().optional(),
    type: z.string({ required_error: "Le type de vehicule est requis" }),
    horsePower: z.number().optional(),
    year: z.number({ required_error: "L'année est requise" }),
    kms: z.number({
      required_error: "La saisie du nombre de kilomètres est requise",
    }),
    price: z.number({ required_error: "Veuillez saisir le montant du prix" }),
    gearbox: z.string().optional(),
    motorization: z.string().optional(),
    co2Emissions: z.number().optional(),
    emissionsClass: z.number().optional(),
    numberDoors: z.number().optional(),
    places: z.number().optional(),
    ptc: z.number().optional(),
    ptr: z.number().optional(),
    payload: z.number().optional(),
    dimensions: z.object({
      length: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      volume: z.number().optional(),
      wheelBase: z.number().optional(),
    }),
    color: z.string().optional(),
    description: z.string().optional(),
  }),
  features: z.object({
    interior: z.object({
      airConditioning: z.boolean().optional(), // Climatisation
      automaticAirConditioning: z.boolean().optional(), // Climatisation automatique
      electricWindows: z.boolean().optional(), // Vitres électriques
      electricRearviewMirrors: z.boolean().optional(), // Rétroviseurs électriques
      bluetooth: z.boolean().optional(), // Bluetooth
      carplay: z.boolean().optional(), // CarPlay / Android Auto
      cruiseControl: z.boolean().optional(), // Régulateur de vitesse
      speedLimiter: z.boolean().optional(), // Limiteur de vitesse
      cruiseLimiter: z.boolean().optional(), // Régulateur / Limiteur combiné
      onboardComputer: z.boolean().optional(), // Ordinateur de bord
      steeringWheelControls: z.boolean().optional(), // Commandes au volant
      usb12vSocket: z.boolean().optional(), // Prise USB / 12V
      frontBench: z.boolean().optional(), // Banquette avant
      partition: z.boolean().optional(), // Cloison de séparation
      reinforcedUpholstery: z.boolean().optional(), // Sellerie renforcée
      suspendedSeat: z.boolean().optional(), // Siège suspendu
      heatedSeat: z.boolean().optional(), // Siège chauffant
      gps: z.boolean().optional(), // GPS intégré
      digitalDashboard: z.boolean().optional(), // Tableau de bord digital
      sleeperCab: z.boolean().optional(), // Cabine couchette
      radio: z.boolean().optional(), // Radio
    }),
    exterior: z.object({
      slidingSideDoor: z.boolean().optional(), // Porte latérale coulissante
      doubleRearDoor: z.boolean().optional(), // Double porte arrière battante
      parkingSensors: z.boolean().optional(), // Capteurs de recul
      rearCamera: z.boolean().optional(), // Caméra de recul
      roofBars: z.boolean().optional(), // Barres de toit
      towHook: z.boolean().optional(), // Crochet d'attelage
      fogLights: z.boolean().optional(), // Projecteurs antibrouillard
      alloyWheels: z.boolean().optional(), // Jantes en alliage
      aluminumWheels: z.boolean().optional(), // Jantes aluminium
      reinforcedSuspension: z.boolean().optional(), // Suspension renforcée
      tippingBed: z.boolean().optional(), // Benne basculante
      crane: z.boolean().optional(), // Grue auxiliaire
      trailerHitch: z.boolean().optional(), // Attelage remorque
      aluminumSideboards: z.boolean().optional(), // Ridelles aluminium
      workLights: z.boolean().optional(), // Projecteurs de travail
      flatbedWithSideboards: z.boolean().optional(), // Plateau avec ridelles
      winch: z.boolean().optional(), // Treuil
      tarpaulin: z.boolean().optional(), // Bâche
      roofSpoiler: z.boolean().optional(), // Spoiler de toit
      beacon: z.boolean().optional(), // Gyrophare
      hydraulicOutlet: z.boolean().optional(), // Prise hydraulique
      trailerHitchRear: z.boolean().optional(), // Attelage arrière pour remorque
    }),
  }),
  images: z
    .array(z.string(), {
      required_error: "Au moins une image est requise",
    })
    .min(1, { message: "Au moins une image est requise" }),
});

// const Announce = mongoose.model("announce", announceSchema);

module.exports = announceSchema;
