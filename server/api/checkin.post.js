import { getFirestore, FieldValue } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
  const db = getFirestore();
  const { uuid } = await readBody(event);

  if (!uuid || uuid.length === 0) {
    return { status: "0" };
  }

  const batch = db.batch();
  uuid.forEach((row) => {
    const recipeRef = db.collection("data_emp").doc(row);
    batch.update(recipeRef, { checkin: FieldValue.serverTimestamp() });
  });

  try {
    await batch.commit();
    console.log("Check-in updates successful.");
    return { status: "OK" };
  } catch (error) {
    console.error("Error updating check-in:", error);
    throw error; // Propagate the error to the event handler framework for proper handling
  }
});
