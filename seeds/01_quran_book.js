'use strict';

exports.seed = (knex, Promise) => {

    return knex('Books').del()
        .then(() => {

            return knex('Books').insert([
                {
                    id: 1,
                    slugId: 'book-quran',
                    type: 'quran',
                    title: 'Quran'
                }
            ]);
        });
};
