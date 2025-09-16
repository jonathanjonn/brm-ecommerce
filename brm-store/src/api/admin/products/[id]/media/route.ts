// import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
// import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
// import ProductMediaService from "../../../modules/product-media/services/product-media"
// import { PRODUCT_MEDIA_MODULE } from "../../../modules/product-media"
// import { uploadFilesWorkflow } from "@medusajs/core-flows"
// import { HttpTypes } from "@medusajs/types"

// /**
//  * POST /admin/products/:id/media
//  * Upload media files for product using Medusa's built-in file workflow
//  */
// export async function POST(
//   req: MedusaRequest,
//   res: MedusaResponse
// ) {
//   try {
//     const { id: productId } = req.params
//     const { files } = req.body as {
//       files: {
//         filename: string
//         mimeType: string
//         content: string // base64 or binary string
//         access?: "public" | "private"
//       }[]
//     }

//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     const productMediaService = req.scope.resolve(PRODUCT_MEDIA_MODULE) as ProductMediaService

//     if (!files || files.length === 0) {
//       return res.status(400).json({
//         message: "No files provided"
//       })
//     }

//     // Validate file types
//     const supportedTypes = ProductMediaService.getSupportedMimeTypes()
//     const allSupportedTypes = [...supportedTypes.images, ...supportedTypes.videos]

//     for (const file of files) {
//       if (!allSupportedTypes.includes(file.mimeType)) {
//         return res.status(400).json({
//           message: `Unsupported file type: ${file.mimeType}`
//         })
//       }
//     }

//     // Upload files using Medusa's built-in workflow
//     const { result: uploadedFiles } = await uploadFilesWorkflow(req.scope).run({
//       input: {
//         files: files.map(file => ({
//           filename: file.filename,
//           mimeType: file.mimeType,
//           content: file.content,
//           access: file.access || "public"
//         }))
//       }
//     })

//     // Save media records to our custom table
//     const mediaRecords = []

//     for (const uploadedFile of uploadedFiles) {
//       const mediaType = ProductMediaService.isVideoMimeType(uploadedFile.mime_type || '') ? "video" : "image"

//       const media = await productMediaService.createMedia({
//         product_id: productId,
//         url: uploadedFile.url,
//         mime_type: uploadedFile.mime_type || '',
//         media_type: mediaType,
//       })

//       mediaRecords.push(media)

//       logger.info(`Uploaded ${mediaType} for product ${productId}: ${uploadedFile.url}`)
//     }

//     return res.json({
//       message: `Successfully uploaded ${files.length} files`,
//       files: uploadedFiles,
//       media: mediaRecords
//     })

//   } catch (error) {
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     logger.error("Error uploading product media:", error)

//     return res.status(500).json({
//       message: "Failed to upload media files",
//       error: error instanceof Error ? error.message : "Unknown error"
//     })
//   }
// }

// /**
//  * GET /admin/products/:id/media
//  * Get all media files for product
//  */
// export async function GET(
//   req: MedusaRequest,
//   res: MedusaResponse
// ) {
//   try {
//     const { id: productId } = req.params
//     const { type } = req.query
//     const productMediaService = req.scope.resolve(PRODUCT_MEDIA_MODULE) as ProductMediaService

//     let media
//     if (type && (type === "image" || type === "video")) {
//       media = await productMediaService.getProductMediaByType(productId, type)
//     } else {
//       media = await productMediaService.getProductMedia(productId)
//     }

//     return res.json({
//       media
//     })

//   } catch (error) {
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     logger.error("Error fetching product media:", error)

//     return res.status(500).json({
//       message: "Failed to fetch media files",
//       error: error instanceof Error ? error.message : "Unknown error"
//     })
//   }
// }

// /**
//  * DELETE /admin/products/:id/media/:mediaId
//  * Delete specific media file
//  */
// export async function DELETE(
//   req: MedusaRequest,
//   res: MedusaResponse
// ) {
//   try {
//     const { id: productId, mediaId } = req.params
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     const productMediaService = req.scope.resolve(PRODUCT_MEDIA_MODULE) as ProductMediaService

//     // Get media info before deleting
//     const media = await productMediaService.getMediaById(mediaId)

//     if (!media || media.product_id !== productId) {
//       return res.status(404).json({
//         message: "Media not found"
//       })
//     }

//     // Delete from our custom table
//     await productMediaService.deleteMedia(mediaId)

//     // TODO: Delete from file storage if needed
//     // This might require additional logic to get file ID from URL

//     logger.info(`Deleted media ${mediaId} for product ${productId}`)

//     return res.json({
//       message: "Media deleted successfully"
//     })

//   } catch (error) {
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     logger.error("Error deleting product media:", error)

//     return res.status(500).json({
//       message: "Failed to delete media file",
//       error: error instanceof Error ? error.message : "Unknown error"
//     })
//   }
// }
// import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
// import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
// import ProductMediaService from "../../../modules/product-media/services/product-media"
// import { PRODUCT_MEDIA_MODULE } from "../../../modules/product-media"
// import { uploadFilesWorkflow } from "@medusajs/core-flows"
// import { HttpTypes } from "@medusajs/types"

// /**
//  * POST /admin/products/:id/media
//  * Upload media files for product using Medusa's built-in file workflow
//  */
// export async function POST(
//   req: MedusaRequest,
//   res: MedusaResponse
// ) {
//   try {
//     const { id: productId } = req.params
//     const { files } = req.body as {
//       files: {
//         filename: string
//         mimeType: string
//         content: string // base64 or binary string
//         access?: "public" | "private"
//       }[]
//     }

//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     const productMediaService = req.scope.resolve(PRODUCT_MEDIA_MODULE) as ProductMediaService

//     if (!files || files.length === 0) {
//       return res.status(400).json({
//         message: "No files provided"
//       })
//     }

//     // Validate file types
//     const supportedTypes = ProductMediaService.getSupportedMimeTypes()
//     const allSupportedTypes = [...supportedTypes.images, ...supportedTypes.videos]

//     for (const file of files) {
//       if (!allSupportedTypes.includes(file.mimeType)) {
//         return res.status(400).json({
//           message: `Unsupported file type: ${file.mimeType}`
//         })
//       }
//     }

//     // Upload files using Medusa's built-in workflow
//     const { result: uploadedFiles } = await uploadFilesWorkflow(req.scope).run({
//       input: {
//         files: files.map(file => ({
//           filename: file.filename,
//           mimeType: file.mimeType,
//           content: file.content,
//           access: file.access || "public"
//         }))
//       }
//     })

//     // Save media records to our custom table
//     const mediaRecords = []

//     for (const uploadedFile of uploadedFiles) {
//       const mediaType = ProductMediaService.isVideoMimeType(uploadedFile.mime_type || '') ? "video" : "image"

//       const media = await productMediaService.createMedia({
//         product_id: productId,
//         url: uploadedFile.url,
//         mime_type: uploadedFile.mime_type || '',
//         media_type: mediaType,
//       })

//       mediaRecords.push(media)

//       logger.info(`Uploaded ${mediaType} for product ${productId}: ${uploadedFile.url}`)
//     }

//     return res.json({
//       message: `Successfully uploaded ${files.length} files`,
//       files: uploadedFiles,
//       media: mediaRecords
//     })

//   } catch (error) {
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     logger.error("Error uploading product media:", error)

//     return res.status(500).json({
//       message: "Failed to upload media files",
//       error: error instanceof Error ? error.message : "Unknown error"
//     })
//   }
// }

// /**
//  * GET /admin/products/:id/media
//  * Get all media files for product
//  */
// export async function GET(
//   req: MedusaRequest,
//   res: MedusaResponse
// ) {
//   try {
//     const { id: productId } = req.params
//     const { type } = req.query
//     const productMediaService = req.scope.resolve(PRODUCT_MEDIA_MODULE) as ProductMediaService

//     let media
//     if (type && (type === "image" || type === "video")) {
//       media = await productMediaService.getProductMediaByType(productId, type)
//     } else {
//       media = await productMediaService.getProductMedia(productId)
//     }

//     return res.json({
//       media
//     })

//   } catch (error) {
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     logger.error("Error fetching product media:", error)

//     return res.status(500).json({
//       message: "Failed to fetch media files",
//       error: error instanceof Error ? error.message : "Unknown error"
//     })
//   }
// }

// /**
//  * DELETE /admin/products/:id/media/:mediaId
//  * Delete specific media file
//  */
// export async function DELETE(
//   req: MedusaRequest,
//   res: MedusaResponse
// ) {
//   try {
//     const { id: productId, mediaId } = req.params
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     const productMediaService = req.scope.resolve(PRODUCT_MEDIA_MODULE) as ProductMediaService

//     // Get media info before deleting
//     const media = await productMediaService.getMediaById(mediaId)

//     if (!media || media.product_id !== productId) {
//       return res.status(404).json({
//         message: "Media not found"
//       })
//     }

//     // Delete from our custom table
//     await productMediaService.deleteMedia(mediaId)

//     // TODO: Delete from file storage if needed
//     // This might require additional logic to get file ID from URL

//     logger.info(`Deleted media ${mediaId} for product ${productId}`)

//     return res.json({
//       message: "Media deleted successfully"
//     })

//   } catch (error) {
//     const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
//     logger.error("Error deleting product media:", error)

//     return res.status(500).json({
//       message: "Failed to delete media file",
//       error: error instanceof Error ? error.message : "Unknown error"
//     })
//   }
// }
