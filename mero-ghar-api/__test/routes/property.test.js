const axios = require('axios');
const baseurl = 'http://localhost:3001/properties';
const Property = require('../../routes/property');

describe('propertiesAPI', () => {
    test('Get all properties', async () => {
        return axios.get(baseurl)
            .then((response) => {
                properties = response.data;
                expect(response.data.length).toBeGreaterThan(0)
            })
    })

    test('Put all into property', async () => {
        return axios.put(baseurl, {
            'title': 'Home'
        })
            .then((response) => {
                expect(response.data.statusCode).toBe(405);
            })
    })
})

