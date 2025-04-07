var express = require("express");
var router = express.Router();
const Announce = require("../model/announce");
const announceSchema = require("../schemas/announce");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp =require('sharp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Dossier où stocker les images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


function sanitizeParsed(parsed) {
  return {
      ...parsed,
      informations: {
          ...parsed.informations,
          horsePower: Number(parsed.informations.horsePower) || undefined,
          year: Number(parsed.informations.year) || undefined,
          kms: Number(parsed.informations.kms) || undefined,
          price: Number(parsed.informations.price) || undefined,
          co2Emissions: Number(parsed.informations.co2Emissions) || undefined,
          emissionsClass: Number(parsed.informations.emissionsClass) || undefined,
          numberDoors: Number(parsed.informations.numberDoors) || undefined,
          places: Number(parsed.informations.places) || undefined,
          ptc: Number(parsed.informations.ptc) || undefined,
          ptr: Number(parsed.informations.ptr) || undefined,
          payload: Number(parsed.informations.payload) || undefined,
          dimensions: {
              length: Number(parsed.informations.dimensions.length) || undefined,
              width: Number(parsed.informations.dimensions.width) || undefined,
              height: Number(parsed.informations.dimensions.height) || undefined,
              volume: Number(parsed.informations.dimensions.volume) || undefined,
              wheelBase: Number(parsed.informations.dimensions.wheelBase) || undefined,
          },
          dateCirculation: parsed.informations.dateCirculation || undefined,
          serialNumber: parsed.informations.serialNumber || undefined,
          carBody: parsed.informations.carBody || undefined,
          type: parsed.informations.type || undefined,
          gearbox: parsed.informations.gearbox || undefined,
          motorization: parsed.informations.motorization || undefined,
          color: parsed.informations.color || undefined
      },
  };
}

router.get("/", (req, res) => {
  Announce.find().then((data) => {
    if (data) {
      res.json({ data, message: "All announces has been loaded" });
    } else {
      res.json({ data, message: "An error occured" });
    }
  });

  router.get("/:id", (req, res) => {
    Announce.findOne({ _id: req.params.id }).then((data) => {
      if (data) {
        res.json({ data, message: "All announces has been loaded" });
      } else {
        res.json({ data, message: "An error occured" });
      }
    });
  });
});

router.post("/publish", upload.array("images"), async (req, res) => {
  try {
    // Parse et nettoie le corps de la requête
    const parsedBody = JSON.parse(req.body.data || "{}");
    const sanitized = sanitizeParsed(parsedBody);

    // Compression des images
    const compressedImagePaths = [];

    for (const file of req.files) {
      const originalPath = file.path;
      const ext = path.extname(originalPath);
      const compressedPath = originalPath.replace(ext, `-compressed.webp`);

      await sharp(originalPath)
        .resize(1200) // Redimensionne en largeur (proportionnel)
        .webp({ quality: 80 }) // Compression format WebP
        .toFile(compressedPath);

      fs.unlinkSync(originalPath); // Supprime l'image originale

      compressedImagePaths.push(compressedPath); // Ajoute le chemin compressé
    }

    const data = {
      ...sanitized,
      images: compressedImagePaths,
    };

    // Zod: validation des données
    const parseResult = announceSchema.safeParse(data);

    if (!parseResult.success) {
      const formattedErrors = {};
      parseResult.error.errors.forEach(err => {
        const path = err.path.join(".");
        formattedErrors[path] = err.message;
      });

      return res.status(400).json({ errors: formattedErrors });
    }

    const newAnnounce = new Announce(parseResult.data);
    await newAnnounce.save();

    return res.status(200).json({
      message: "Annonce publiée avec succès !",
      data: parseResult.data,
    });
  } catch (error) {
    console.error("Erreur /publish :", error);
    return res.status(500).json({
      message: "Une erreur interne est survenue",
      error: error.message,
    });
  }
});

router.put("/modify/:id", upload.array("images"), async (req, res) => {
  try {
    const { id } = req.params;
    const parsedData = JSON.parse(req.body.data || "{}");
    const deletedImages = JSON.parse(req.body.deletedImages || "[]");

    const sanitized = sanitizeParsed(parsedData);

    // 🔥 Supprimer les anciennes images supprimées par l'admin
    for (const pathToDelete of deletedImages) {
      if (fs.existsSync(pathToDelete)) {
        fs.unlinkSync(pathToDelete);
      }
    }

    // 🔧 Compression des nouvelles images
    const compressedImagePaths = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const originalPath = file.path;
        const ext = path.extname(originalPath);
        const compressedPath = originalPath.replace(ext, `-compressed.webp`);

        await sharp(originalPath)
          .resize({ width: 1200 })
          .webp({ quality: 75 })
          .toFile(compressedPath);

        fs.unlinkSync(originalPath); // supprime l'original
        compressedImagePaths.push(compressedPath);
      }
    }

    // 📸 Conserve les anciennes restantes (celles non supprimées)
    const existingImages = Array.isArray(sanitized.images)
      ? sanitized.images.filter((img) => typeof img === "string")
      : [];

    const finalImages = [...existingImages, ...compressedImagePaths];

    const updatedData = {
      ...sanitized,
      images: finalImages,
    };

    const updatedAnnounce = await Announce.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedAnnounce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    return res.status(200).json({
      message: "Annonce modifiée avec succès",
      data: updatedAnnounce,
    });
  } catch (error) {
    console.error("Erreur PUT /announces/:id :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const announce = await Announce.findById(req.params.id);

    if (!announce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // Suppression des images
    if (announce.images && Array.isArray(announce.images)) {
      announce.images.forEach((imagePath) => {
        //fullPath genere la route du fichier '__dirname/le du repertoire/uploads/lenomdufichierdel'image selon format path.basename
        const fullPath = path.join(
          __dirname,
          "..",
          "uploads",
          path.basename(imagePath)
        );
        if (fs.existsSync(fullPath)) {
          //regarde si le fichier existe
          fs.unlinkSync(fullPath); // supprimes le fichier existant
        }
      });
    }

    // Suppression de l'annonce
    await Announce.deleteOne({ _id: req.params.id }); // on supprime en base de donnée ici

    res.json({ message: "L'annonce et ses images ont été supprimées" });
  } catch (err) {
    res.status(500).json({ message: "Une erreur est survenue", error: err });
  }
});

module.exports = router;
