<template>
    <div class="min-h-screen flex  justify-center">
        <div class=" h-screen w-full fixed top-0 z-0">
            <div class=" h-screen w-full relative bg-gray-800/80 z-10"></div>
            <NuxtImg src="/bg.png" class="h-screen w-full object-cover absolute top-0 z-0" alt="background" preload />
        </div>
        <div class="bg-white p-8 rounded shadow w-full max-w-md z-10 h-fit m-4 relative">
            <h2 class="text-2xl font-bold mb-4 text-center"> {{ !data_emp?.emp ? 'ลงทะเบียนเข้างาน' :
                'ตรวจสอบรายละเอียด'
                }}
            </h2>
            <form @submit.prevent="router.push({
                query: {
                    emp: emp
                }
            })" v-if="!data_emp?.emp">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        รหัสพนักงาน
                    </label>
                    <input v-model="emp" :disabled="load" required
                        class="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ease-in-out transition-all"
                        id="name" type="text" placeholder="รหัสพนักงาน" autocomplete="off" />
                </div>

                <div class="flex items-center justify-center">
                    <button :class="{ 'opacity-50 cursor-not-allowed': load }" :disabled="load"
                        class="bg-[#4299e1] hover:bg-[#2b6cb0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out transition-all"
                        type="submit">
                        <div v-if="load" class="flex items-center space-x-1">
                            <div>
                                <svg class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </div>
                            <div>Loading...</div>
                        </div>
                        <template v-else>
                            ลงทะเบียน
                        </template>
                    </button>
                </div>
                <div v-if="error_data.status" class=" p-1 rounded-md text-center  mt-4"
                    :class="error_data.text == 'ลงทะเบียนเข้างานสำเร็จ' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{
                        error_data.text }}
                </div>
            </form>
            <div class="max-h-screen overflow-auto space-y-2 " v-else>

                <div class=" space-y-1  border-b py-2">
                    <div class="flex items-center space-x-1">
                        <div>
                            รหัสพนักงาน :
                        </div>
                        <div class="font-bold">{{ data_emp.emp }}</div>
                    </div>
                    <div class="flex items-center space-x-1">
                        <div>
                            ชื่อ - นามสกุล :
                        </div>
                        <div class="font-bold">{{ data_emp.name }}</div>
                    </div>
                    <div class="flex items-center space-x-1">
                        <div>
                            คลัง :
                        </div>
                        <div class="font-bold">{{ data_emp.format }}</div>
                    </div>
                    <div class="flex items-center space-x-1">
                        <div>
                            แผนก :
                        </div>
                        <div class="font-bold">{{ data_emp.dep }}</div>
                    </div>
                    <div class="flex items-center space-x-1">
                        <div>สี : </div>
                        <div v-for="row2 in data_emp.color" :key="row2" :class="`px-1 rounded-md 
                        ${[
                                row2 == 'สีดำ' && ' bg-black text-white ',
                                row2 == 'สีเหลือง' && ' bg-yellow-500 text-yellow-50 ',
                                row2 == 'สีเขียว' && ' bg-green-500 text-green-50 ',
                                row2 == 'สีแดง' && ' bg-red-500 text-red-50 ',
                                row2 == 'สีฟ้า' && ' bg-blue-500 text-blue-50 ',
                                row2 == 'สีม่วง' && ' bg-purple-500 text-purple-50 ',
                            ]
                            } 
                        `">{{ row2 }} </div>
                    </div>
                    <div class="flex items-center space-x-1">
                        <div>ประเภท : </div>
                        <div v-for="row3 in data_emp.remark" :key="row3"
                            class="font-bold px-1 rounded-md bg-gray-100 text-gray-700">{{ row3 }} </div>
                    </div>
                </div>
                <div class="space-y-1">
                    <div v-if="!data_emp?.checkin">
                        <button @click="checkin();"
                            class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out transition-all w-full"
                            type="button">
                            <div>
                                ยืนยันลงทะเบียน
                            </div>

                        </button>
                    </div>
                    <div v-else class=" space-y-1 text-center">
                        <div class="text-xs">มี่การบันทึกเวลาการลงทะเบียนในระบบแล้ว</div>
                        <div class=" px-1 rounded-md bg-gray-100 text-gray-700 font-bold">{{ data_emp?.checkin }}</div>
                        <div class="text-xs">เวลาในการลงทะเบียน</div>
                    </div>
                    <div class=" absolute top-1 left-1">
                        <button @click="router.push({ query: {} });"
                            class="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out transition-all w-full"
                            type="button">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </div>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const router = useRouter();
const route = useRoute();
const load = ref(false);

const emp = ref('');
const error_data = ref({
    status: false,
    text: ''
})

const data_emp = ref({});
onMounted(() => {
    if (route.query.emp && !data_emp.value.emp) {
        router.replace({ query: {} });
    }
});
const register = async () => {
    load.value = true; // เปลี่ยนค่า load เป็น true เมื่อเริ่มต้นส่งคำขอ
    error_data.value = {
        status: false,
        text: ""
    }
    let valuedata = emp.value;
    try {
        const response = await $fetch('/api/select_emp', {
            method: 'POST',

            body: { emp: emp.value }
        });
        const { status, data } = response
        if (status == '0') {
            router.replace({ query: {} }).then(() => {
                emp.value = valuedata;
                error_data.value = {
                    status: true,
                    text: "ไม่พบข้อมูลพนักงาน"
                }
            })

        }
        if (status == 'OK') {
            data_emp.value = data;
        }

        // ทำสิ่งที่ต้องการหลังจากลงทะเบียนสำเร็จ เช่น แสดงข้อความ, รีเซ็ตฟอร์ม, โชว์แจ้งเตือน, เปลี่ยนหน้า

    } catch (error) {
        console.error('Registration error:', error.message);
        // แสดงข้อความหรือทำการจัดการข้อผิดพลาด
    } finally {
        load.value = false; // เปลี่ยนค่า load เป็น false เมื่อคำขอสำเร็จหรือเกิดข้อผิดพลาด
    }
};
const checkin = async () => {
    try {
        const response = await $fetch('/api/checkin', {
            method: 'POST',
            body: { uuid: data_emp.value.uuid }
        });
        const { status, data } = response
        if (status == 'OK') {
            router.replace({ query: {} }).then(() => {
                emp.value = '';
                data_emp.value = {};
                error_data.value = {
                    status: true,
                    text: "ลงทะเบียนเข้างานสำเร็จ"
                }
            })
        }
    } catch (error) {
        console.error('Checkin error:', error.message);
    }
}

watch(
    () => route.query,
    () => {

        if (!route.query.emp) {
            error_data.value = {
                status: false,
                text: ""
            };
            emp.value = '';
            data_emp.value = {};
        } else {
            emp.value = route.query.emp
            register()
        }
    }
);
</script>
