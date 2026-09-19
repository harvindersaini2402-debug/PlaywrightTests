import {test, expect} from '../../src/fixtures/apifixtures';


const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER= 
{Authorization: `Bearer ${TOKEN}`};

async function createUser(apiHelper: any) {
    let userData = {
        "name": "Harvinder API Test",
        "email": `automation_${Date.now()}@test.com`,
        "gender": "male",
        "status": "active"
    };
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

test('create user test', async ({apiHelper}) => {
   let userResponse = await createUser(apiHelper);
   let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    console.log(response.body);
    console.log(response.status);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userResponse.name);
});


test('delete user test', async ({apiHelper}) => {
   let userResponse = await createUser(apiHelper);
   let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(204);

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
});