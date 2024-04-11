const bcrypt = require("bcrypt");
const Character = require("../repositories/Character");
const statusCodes = require("../utils/statusCodes");

exports.addCharacter = async (req, res) => {
  console.log(req.body);
  try {
    const characterData = req.body;
    const character = new Character({
      name: characterData.name,
      gender: characterData.gender,
      hairColor: characterData.hairColor,
      eyeColor: characterData.eyeColor,
      facialHair: characterData.facialHair,
      glasses: characterData.glasses,
      hat: characterData.hat,
      accessories: characterData.accessories,
      image: req.file ? req.file.filename : null,
    });
    console.log(req.file, "req.file");
    console.log(req.file.filename, "req.file.filename");
    console.log(character.image, "characterData image");
    console.log(character, "new character");
    await character.save();
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "Character added", character });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding character" });
  }
};
exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(statusCodes.statusCodes.OK).json({ characters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving characters" });
  }
};

exports.getOneCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.status(statusCodes.statusCodes.OK).json({ character });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving character" });
  }
};

exports.editCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    character.name = req.body.name;
    character.gender = req.body.gender;
    character.hairColor = req.body.hairColor;
    character.eyeColor = req.body.eyeColor;
    character.facialHair = req.body.facialHair;
    character.glasses = req.body.glasses;
    character.hat = req.body.hat;
    character.accessories = req.body.accessories;
    if (req.file) {
      character.image = req.file.filename;
    }
    await character.save();
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "Character updated", character });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating character" });
  }
};

exports.deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "Character deleted", character });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting character" });
  }
};
