import { getFirestore } from "firebase-admin/firestore";
import dayjs from "dayjs";
export default defineEventHandler(async (event) => {
  const db = getFirestore();
  const { emp } = await readBody(event);
  const emp_data = isNaN(Number(emp)) ? emp : Number(emp);

  let query;
  if (isNaN(emp_data)) {
    // If emp_data is not a number (i.e., it is a string)
    query = db
      .collection("data_emp")
      .where("emp", "in", [emp_data.toUpperCase(), emp_data.toLowerCase()]);
  } else {
    // If emp_data is a number
    query = db.collection("data_emp").where("emp", "==", emp_data);
  }

  const recipeSnap = await query.get();

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

    recipeData.forEach((row) => {
      if (!data_emp.remark.includes(row.data.remark)) {
        data_emp.remark.push(row.data.remark);
      }
      if (!data_emp.color.includes(row.data.type_color)) {
        data_emp.color.push(row.data.type_color);
      }
      if (!data_emp.uuid.includes(row.uuid)) {
        data_emp.uuid.push(row.uuid);
      }
    });

    return { status: "OK", data: data_emp };
  } else {
    return { status: "0" };
  }
});
