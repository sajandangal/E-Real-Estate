const User = require('../.././models/users');
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

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
})

describe('User Schema Test', () => {
    it('should be able to add new user', async () => {
        let user = await User.create({ 'fullName': "Uttam Tamang" });
        expect(user.fullName).toMatch("Uttam Tamang");
    })

    it('should be able to update user', async () => {
        let user = await User.findOne({
            'fullName': 'Uttam Tamang'
        });
        user.fullName = 'Uttam Waiba';

        let newUser = await user.save();
        expect(newUser.fullName).toBe('Uttam Waiba');
    })

    it("should delete the User", async () => {
        let user = await User.findOneAndDelete({
            'fullName': 'Uttam Waiba'
        });
        expect(user.fullName).toMatch('Uttam Waiba');
    })
})