'use strict';

const Constants = require('../lib/constants');

exports.seed = (knex, Promise) => {

    return knex('Books').del()
        .then(() => {

            return knex('Books').insert([
                {
                    id: 1,
                    slugId: 'book-quran',
                    type: Constants.bookType.quran,
                    title: 'Quran'
                }
            ]);
        });
};
