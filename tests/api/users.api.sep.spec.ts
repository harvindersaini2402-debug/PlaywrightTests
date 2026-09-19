import {test, expect} from '../../src/fixtures/apifixtures';


const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER= 
{Authorization: `Bearer ${TOKEN}`};

let userId: number;

test.describe.serial('User API Tests', () => {

test('get user test', async ({apiHelper}) => {
    let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    console.log(response.body);
    console.log(response.status);
    expect(response.status).toBe(200);
});

test('post user test', async ({apiHelper}) => {
    let userData = {
        "name": "Harvinder API Test",
        "email": `automation_${Date.now()}@test.com`,   
        "gender": "male",
        "status": "active"
    };
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    console.log(response.body);
    expect(response.body.name).toBe(userData.name);
    console.log(response.status);
    expect(response.status).toBe(201);
    userId= response.body.id;
});


test('put user test', async ({apiHelper}) => {
    let userUpdatedData = {
        "name": "Harvinder API Test Updated",
        "status": "inactive"
    };
    let response = await apiHelper.put(`/public/v2/users/${userId}`, userUpdatedData, AUTH_HEADER);
    console.log(response.body);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);
    console.log(response.status);
    expect(response.status).toBe(200);
});

test('delete user test', async ({apiHelper}) => {
    let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.status).toBe(204);  
});

});