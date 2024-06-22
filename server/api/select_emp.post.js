import { getFirestore } from "firebase-admin/firestore";
import dayjs from "dayjs";
export default defineEventHandler(async (event) => {
  const db = getFirestore();
  const { emp } = await readBody(event);

  const recipeSnap = await db
    .collection("data_emp")
    .where("emp", "==", isNaN(Number(emp)) ? emp : Number(emp))
    .get();

  if (recipeSnap.empty) {
    return { status: "0" };
  }

  const recipeData = recipeSnap.docs.map((row) => {
    return {
      uuid: row.id,
      data: row.data(),
    };
  });
  if (recipeData.length) {
    const data_emp = {
      emp: recipeData[0].data.emp,
      name: recipeData[0].data.name,
      dep: recipeData[0].data.dep,
      format: recipeData[0].data.format,
      checkin: recipeData[0].data.checkin
        ? dayjs(recipeData[0].data.checkin.toDate()).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        : null,
      remark: [],
      color: [],
      uuid: [],
    };
    recipeData.map((row) => {
      data_emp.remark.push(row.data.remark);
      data_emp.color.push(row.data.type_color);
      data_emp.uuid.push(row.uuid);
    });
    return { status: "OK", data: data_emp };
  } else {
    return { status: "0" };
  }
});
