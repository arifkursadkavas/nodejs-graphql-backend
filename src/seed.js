import models from './models/index'

export const seedDb = async () => {
    await models.User.create({
            username:'arif',
            email: 'arif@arif.com',
                password: 'arifarif',
            messages:[
                {
                    text: 'Hey there Janis'
                }
            ],
            role: 'ADMIN'
    },
    {
        include: [models.Message]
    });

    await models.User.create({
        username:'kursad',
        email: 'kursad@kursad.com',
            password: 'kursadkursad',
        messages:[
            {
                text: 'Hey there Grace'
            }
        ]
    },
    {
        include: [models.Message]
    });
}