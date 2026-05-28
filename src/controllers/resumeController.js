const fs = require("fs");
const pdfParse = require("pdf-parse");

const prisma = require("../lib/prisma");

exports.uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    const savedResume = await prisma.resume.create({
      data: {
        content: pdfData.text,
        fileName: req.file.filename,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume: savedResume,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};