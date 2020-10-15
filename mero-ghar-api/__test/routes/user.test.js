const axios = require("axios");

const baseurl = "http://localhost:3001/users";

describe("Users Route Test", () => {
    let token;
    test("sign up of new user", () => {
        return axios
            .post(baseurl + "/signup", {
                fullName: 'ironman',
                profilePicture: 'ironman.jpeg',
                phone: '1234567890',
                email: 'ironman@gmail.com',
                address: 'newyork',
                password: 'ironman123'
            })
            .then(response => {
                expect(response.data.status).toMatch("Signup success!");
            })
            .catch(err => { });
    });

    test("login of existing user", () => {
        return axios
            .post(baseurl + "/login", {
                email: "ironman@gmail.com",
                password: "ironman123"
            })
            .then(response => {
                token = response.data.token;
                expect(response.status).toBe(200);
                expect(response.data.status).toMatch("Login Successful!");
            })
            .catch(err => { });
    });

    test("User should be able to view profile", () => {
        return axios
            .get(baseurl + "/myProfile", {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                expect(response.status).toBe(200);
            });
    });
});
