const Category = require('../.././models/propertyCategory');
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

describe('Property category Schema Test', () => {
    it('should be able to add new category', async () => {
        let cate = await Category.create({ 'propertyCategory': "Residental" });
        expect(cate.propertyCategory).toMatch("Residental");
    })

    it('should be able to update propertyCategory', async () => {
        let cate = await Category.findOne({
            'propertyCategory': 'Residental'
        });
        cate.propertyCategory = 'Appartment';

        let newCate = await cate.save();
        expect(newCate.propertyCategory).toBe('Appartment');
    })

    it("should delete the User", async () => {
        let cate = await Category.findOneAndDelete({
            'propertyCategory': 'Appartment'
        });
        expect(cate.propertyCategory).toMatch('Appartment');
    })
})