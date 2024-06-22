import { getFirestore } from "firebase-admin/firestore";


export default defineEventHandler(async (event) => {
 
  const db = getFirestore();
  const recipeSnap = await db.collection("recipe").get();
  const recipeData = recipeSnap.docs.map((doc) => {
    return {
      uuid: doc.id,
      data:doc.data()
    };
  });

  return recipeData;
});