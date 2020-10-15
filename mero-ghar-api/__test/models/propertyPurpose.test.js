const Purpose = require('../.././models/propertyPurpose');
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

describe('Property purpose Schema Test', () => {
    it('should be able to add new property purpose', async () => {
        let prp = await Purpose.create({ 'propertyPurpose': "Sell" });
        expect(prp.propertyPurpose).toMatch("Sell");
    })

    it('should be able to update propertyPurpose', async () => {
        let prp = await Purpose.findOne({
            'propertyPurpose': 'Sell'
        });
        prp.propertyPurpose = 'Rent';

        let newPrp = await prp.save();
        expect(newPrp.propertyPurpose).toBe('Rent');
    })

    it("should delete the purpose", async () => {
        let prp = await Purpose.findOneAndDelete({
            'propertyPurpose': 'Rent'
        });
        expect(prp.propertyPurpose).toMatch('Rent');
    })
})