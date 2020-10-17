import models from './models/index'

export const seedDb = async () => {
    await models.User.create({
        username:'arif',
        messages:[
            {
                text: 'Hey there Janis'
            }
        ]
    },
    {
        include: [models.Message]
    });

    await models.User.create({
        username:'kursad',
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