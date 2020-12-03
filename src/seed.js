import models from './models/index'

export const seedDb = async (date) => {
    await models.User.create({
            username:'arif',
            email: 'arif@arif.com',
                password: 'arifarif',
            messages:[
                {
                    text: 'Hey there Janis',
                    createdAt: date.setSeconds(date.getSeconds() + 1)
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
                text: 'Hey there Grace',
                createdAt: date.setSeconds(date.getSeconds() + 1)
            },
            {
                text: 'Hey there Alice',
                createdAt: date.setSeconds(date.getSeconds() + 1)
            }
        ]
    },
    {
        include: [models.Message]
    });
}