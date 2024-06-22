import { getFirestore } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
  const db = getFirestore();
  const recipeSnap = await db.collection("test").get();
  const recipeData = recipeSnap.docs.map((row) => {
    return {
      uuid: row.id,
      data: row.data(),
    };
  });

  return recipeData;
});
