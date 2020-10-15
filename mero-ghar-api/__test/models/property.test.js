const Property = require('../.././models/property');
const mongoose = require('mongoose');
const DbTest = 'mongodb://localhost:27017/testdbmg';

beforeAll(async () => {
    await mongoose.connect(DbTest, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
})

describe('Property Schema Test', () => {
    it('should be able to add new property', async () => {
        let property = await Property.create({
            'title': "beautiful house for sell", 'price': "123", 'purpose': "sell",
            'category': "flat", 'address': "Kathmandu"
        });
        expect(property.title).toMatch("beautiful house for sell");
    })

    it('should be able to update property', async () => {
        let property = await Property.findOne({
            'title': 'beautiful house for sell'
        });
        property.title = 'beautiful house for rent';

        let newProperty = await property.save();
        expect(newProperty.title).toBe('beautiful house for rent');
    })

    it("should delete the proeprty", async () => {
        let property = await Property.findOneAndDelete({
            'title': 'beautiful house for rent'
        });
        expect(property.title).toMatch('beautiful house for rent');
    })
})