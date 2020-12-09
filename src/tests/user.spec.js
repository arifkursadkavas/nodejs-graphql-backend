import { expect } from "chai";
import * as userApi from './api';

describe('users', () => {
    describe('user(id:String!): User', () => {
        it('returns a user if a user is found', async () => {
            const expectedResult = {
                data:{
                    user:{
                        id:'1',
                        username:'arif',
                        email:'arif@arif.com',
                        role:'ADMIN'
                    }
                }
            };

            const result = await userApi.user({id:'1'});

            expect(result.data).to.eql(expectedResult);

        });

        it('returns null when user cannot be found',  async  () => {
            const expectedResult = {
                data: {
                    user: null,
                },
            };

            const result = await userApi.user({id: '42'});

            expect(result.data).to.eql(expectedResult);
        });

    });

    describe('deleteUser(id: String!): Boolean!', () => {
        it('returns an error because only admins can delete a user', async () => {
            const {
                data:{
                    data: {
                        signIn:{token},
                    }
                }
            } = await userApi.signIn({login:'kursad', password:'kursadkursad'});

            const {
                data:{errors},
            } =  await userApi.deleteUser({id: '1'}, token);

            expect(errors[0].message).to.eql('You are not authorized as admin');
        });
    });
});