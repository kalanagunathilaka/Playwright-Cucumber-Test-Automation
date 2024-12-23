const date = new Date();

const uniqueTimestamp = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

export const sharedData = {

    randomInt: Number(uniqueTimestamp),
    randomStr: `API_Test_${uniqueTimestamp}`,

}