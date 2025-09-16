// import { MedusaService } from "@medusajs/framework/utils"
// import { ProductMedia } from "../models/product-media"

// type CreateProductMediaInput = {
//   product_id: string
//   url: string
//   mime_type: string
//   media_type: "image" | "video"
//   file_size?: number
//   thumbnail_url?: string
//   alt_text?: string
//   order?: number
//   duration?: number
//   width?: number
//   height?: number
// }

// type UpdateProductMediaInput = Partial<CreateProductMediaInput> & {
//   id: string
// }

// /**
//  * Service for managing product media (images + videos)
//  * Follows Medusa v2 service patterns with MedusaService base
//  */
// class ProductMediaService extends MedusaService({
//   ProductMedia,
// }) {
//   /**
//    * Create new product media entry
//    */
//   async createMedia(data: CreateProductMediaInput): Promise<ProductMedia> {
//     const media = await this.create({
//       ...data,
//       order: data.order ?? 0,
//     })

//     return media
//   }

//   /**
//    * Get all media for a product (ordered by order field)
//    */
//   async getProductMedia(productId: string): Promise<ProductMedia[]> {
//     return await this.list(
//       { product_id: productId },
//       { relations: [], order: { order: "ASC", created_at: "ASC" } }
//     )
//   }

//   /**
//    * Get media by type (images or videos)
//    */
//   async getProductMediaByType(
//     productId: string,
//     type: "image" | "video"
//   ): Promise<ProductMedia[]> {
//     return await this.list(
//       { product_id: productId, media_type: type },
//       { relations: [], order: { order: "ASC", created_at: "ASC" } }
//     )
//   }

//   /**
//    * Update media entry
//    */
//   async updateMedia(data: UpdateProductMediaInput): Promise<ProductMedia> {
//     const media = await this.update(data.id, data)
//     return media
//   }

//   /**
//    * Delete media entry
//    */
//   async deleteMedia(id: string): Promise<void> {
//     await this.delete(id)
//   }

//   /**
//    * Reorder media items
//    */
//   async reorderMedia(productId: string, mediaIds: string[]): Promise<void> {
//     const mediaItems = await this.list({
//       product_id: productId,
//       id: mediaIds
//     })

//     // Update order based on array index
//     for (const media of mediaItems) {
//       const newOrder = mediaIds.indexOf(media.id)
//       if (newOrder !== -1) {
//         await this.update(media.id, { order: newOrder })
//       }
//     }
//   }

//   /**
//    * Get media file info by ID
//    */
//   async getMediaById(id: string): Promise<ProductMedia | null> {
//     try {
//       return await this.retrieve(id)
//     } catch {
//       return null
//     }
//   }

//   /**
//    * Helper to determine if file is video
//    */
//   static isVideoMimeType(mimeType: string): boolean {
//     return mimeType.startsWith('video/')
//   }

//   /**
//    * Helper to get supported mime types
//    */
//   static getSupportedMimeTypes() {
//     return {
//       images: [
//         'image/jpeg',
//         'image/jpg',
//         'image/png',
//         'image/gif',
//         'image/webp',
//         'image/svg+xml'
//       ],
//       videos: [
//         'video/mp4',
//         'video/mov',
//         'video/avi',
//         'video/webm',
//         'video/quicktime'
//       ]
//     }
//   }
// }

// export default ProductMediaService
// import { MedusaService } from "@medusajs/framework/utils"
// import { ProductMedia } from "../models/product-media"

// type CreateProductMediaInput = {
//   product_id: string
//   url: string
//   mime_type: string
//   media_type: "image" | "video"
//   file_size?: number
//   thumbnail_url?: string
//   alt_text?: string
//   order?: number
//   duration?: number
//   width?: number
//   height?: number
// }

// type UpdateProductMediaInput = Partial<CreateProductMediaInput> & {
//   id: string
// }

// /**
//  * Service for managing product media (images + videos)
//  * Follows Medusa v2 service patterns with MedusaService base
//  */
// class ProductMediaService extends MedusaService({
//   ProductMedia,
// }) {
//   /**
//    * Create new product media entry
//    */
//   async createMedia(data: CreateProductMediaInput): Promise<ProductMedia> {
//     const media = await this.create({
//       ...data,
//       order: data.order ?? 0,
//     })

//     return media
//   }

//   /**
//    * Get all media for a product (ordered by order field)
//    */
//   async getProductMedia(productId: string): Promise<ProductMedia[]> {
//     return await this.list(
//       { product_id: productId },
//       { relations: [], order: { order: "ASC", created_at: "ASC" } }
//     )
//   }

//   /**
//    * Get media by type (images or videos)
//    */
//   async getProductMediaByType(
//     productId: string,
//     type: "image" | "video"
//   ): Promise<ProductMedia[]> {
//     return await this.list(
//       { product_id: productId, media_type: type },
//       { relations: [], order: { order: "ASC", created_at: "ASC" } }
//     )
//   }

//   /**
//    * Update media entry
//    */
//   async updateMedia(data: UpdateProductMediaInput): Promise<ProductMedia> {
//     const media = await this.update(data.id, data)
//     return media
//   }

//   /**
//    * Delete media entry
//    */
//   async deleteMedia(id: string): Promise<void> {
//     await this.delete(id)
//   }

//   /**
//    * Reorder media items
//    */
//   async reorderMedia(productId: string, mediaIds: string[]): Promise<void> {
//     const mediaItems = await this.list({
//       product_id: productId,
//       id: mediaIds
//     })

//     // Update order based on array index
//     for (const media of mediaItems) {
//       const newOrder = mediaIds.indexOf(media.id)
//       if (newOrder !== -1) {
//         await this.update(media.id, { order: newOrder })
//       }
//     }
//   }

//   /**
//    * Get media file info by ID
//    */
//   async getMediaById(id: string): Promise<ProductMedia | null> {
//     try {
//       return await this.retrieve(id)
//     } catch {
//       return null
//     }
//   }

//   /**
//    * Helper to determine if file is video
//    */
//   static isVideoMimeType(mimeType: string): boolean {
//     return mimeType.startsWith('video/')
//   }

//   /**
//    * Helper to get supported mime types
//    */
//   static getSupportedMimeTypes() {
//     return {
//       images: [
//         'image/jpeg',
//         'image/jpg',
//         'image/png',
//         'image/gif',
//         'image/webp',
//         'image/svg+xml'
//       ],
//       videos: [
//         'video/mp4',
//         'video/mov',
//         'video/avi',
//         'video/webm',
//         'video/quicktime'
//       ]
//     }
//   }
// }

// export default ProductMediaService
