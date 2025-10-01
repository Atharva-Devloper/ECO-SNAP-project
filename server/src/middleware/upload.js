const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

// Configure multer storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_UPLOAD) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
});

// Process and save image
exports.processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Generate unique filename
    const filename = `${req.user.id}-${Date.now()}${path.extname(req.file.originalname)}`;
    const filepath = path.join(__dirname, '../../uploads', filename);

    // Ensure uploads directory exists
    await fs.mkdir(path.join(__dirname, '../../uploads'), { recursive: true });

    // Process image with sharp
    await sharp(req.file.buffer)
      .resize(
        parseInt(process.env.IMAGE_MAX_WIDTH) || 1200,
        parseInt(process.env.IMAGE_MAX_HEIGHT) || 1200,
        {
          fit: 'inside',
          withoutEnlargement: true
        }
      )
      .jpeg({ quality: parseInt(process.env.IMAGE_QUALITY) || 80 })
      .toFile(filepath);

    // Add file info to request
    req.processedFile = {
      filename: filename,
      path: `/uploads/${filename}`,
      size: req.file.size
    };

    next();
  } catch (error) {
    next(error);
  }
};

// Process multiple images
exports.processMultipleImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    const processedFiles = [];

    // Ensure uploads directory exists
    await fs.mkdir(path.join(__dirname, '../../uploads'), { recursive: true });

    // Process each file
    for (const file of req.files) {
      const filename = `${req.user.id}-${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
      const filepath = path.join(__dirname, '../../uploads', filename);

      await sharp(file.buffer)
        .resize(
          parseInt(process.env.IMAGE_MAX_WIDTH) || 1200,
          parseInt(process.env.IMAGE_MAX_HEIGHT) || 1200,
          {
            fit: 'inside',
            withoutEnlargement: true
          }
        )
        .jpeg({ quality: parseInt(process.env.IMAGE_QUALITY) || 80 })
        .toFile(filepath);

      processedFiles.push({
        filename: filename,
        path: `/uploads/${filename}`,
        size: file.size
      });
    }

    req.processedFiles = processedFiles;
    next();
  } catch (error) {
    next(error);
  }
};

// Export multer upload
exports.uploadSingle = upload.single('image');
exports.uploadMultiple = upload.array('images', 5); // Max 5 images
exports.uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'documents', maxCount: 5 }
]);
