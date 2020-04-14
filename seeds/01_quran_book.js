'use strict';

const Constants = require('../lib/constants');

exports.seed = (knex, Promise) => {

    return knex('books').del()
        .then(() => {

            return knex('books').insert([
                {
                    id: 1,
                    slug_id: 'book-quran',
                    type: Constants.book_type.quran,
                    title: 'Quran'
                }
            ]);
        });
};
