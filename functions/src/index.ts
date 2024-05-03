import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

interface Product {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

exports.addProduct = functions.https.onCall(
  async (data: Product, context: functions.https.CallableContext) => {
    // Optionally check for authenticated user: context.auth?.uid
    try {
      const result = await admin.firestore().collection("products").add(data);
      return {id: result.id, ...data};
    } catch (error) {
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to add product",
        error
      );
    }
  }
);

// Get a single product
exports.getProduct = functions.https.onCall(
  async (
    data: { productId: string },
    context: functions.https.CallableContext
  ) => {
    try {
      const productDoc = await admin
        .firestore()
        .collection("products")
        .doc(data.productId)
        .get();
      if (!productDoc.exists) {
        throw new functions.https.HttpsError("not-found", "Product not found");
      }
      return productDoc.data();
    } catch (error) {
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to get product",
        error
      );
    }
  }
);

// Update a productF
exports.updateProduct = functions.https.onCall(
  async (
    data: { productId: string; updates: Partial<Product> },
    context: functions.https.CallableContext
  ) => {
    try {
      const productRef = admin
        .firestore()
        .collection("products")
        .doc(data.productId);
      await productRef.update(data.updates);
      return {productId: data.productId, updates: data.updates};
    } catch (error) {
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to update product",
        error
      );
    }
  }
);

// Delete a product
exports.deleteProduct = functions.https.onCall(
  async (
    data: { productId: string },
    context: functions.https.CallableContext
  ) => {
    try {
      await admin
        .firestore()
        .collection("products")
        .doc(data.productId)
        .delete();
      return {productId: data.productId};
    } catch (error) {
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to delete product",
        error
      );
    }
  }
);
