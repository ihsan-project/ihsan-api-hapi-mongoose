'use strict';

const Constants = require('../lib/constants');
const Moment = require('moment');

exports.seed = (knex, Promise) => {

    return knex('books').del()
        .then(() => {

            const curentDate = Moment();

            return knex('books').insert([
                {
                    id: 1,
                    created_at: curentDate,
                    slug_id: 'book-quran',
                    type: Constants.book_type.quran,
                    title: 'Quran'
                },
                {
                    id: 2,
                    created_at: curentDate,
                    slug_id: 'book-zikr-subh-allah',
                    type: Constants.book_type.zikr,
                    title: 'Subhaan Allaahi'
                },
                {
                    id: 3,
                    created_at: curentDate,
                    slug_id: 'book-zikr-surah-fatiha',
                    type: Constants.book_type.zikr,
                    title: 'Surah Fatiha'
                },
                {
                    id: 4,
                    created_at: curentDate,
                    slug_id: 'book-zikr-surah-ikhlas',
                    type: Constants.book_type.zikr,
                    title: 'Surah Ikhlas'
                },
                {
                    id: 5,
                    created_at: curentDate,
                    slug_id: 'book-zikr-la-ilaha',
                    type: Constants.book_type.zikr,
                    title: 'La Ilaha'
                },
                {
                    id: 6,
                    created_at: curentDate,
                    slug_id: 'book-zikr-alhamdu',
                    type: Constants.book_type.zikr,
                    title: 'Alhamdulillah'
                },
                {
                    id: 7,
                    created_at: curentDate,
                    slug_id: 'book-zikr-allahuakbar',
                    type: Constants.book_type.zikr,
                    title: 'Allahuakbar'
                },
                {
                    id: 8,
                    created_at: curentDate,
                    slug_id: 'book-salawaat-al-fatih',
                    type: Constants.book_type.salawaat,
                    title: 'Salawat Al-Fatih'
                },
                {
                    id: 9,
                    created_at: curentDate,
                    slug_id: 'book-salawaat-munajiyyah',
                    type: Constants.book_type.salawaat,
                    title: 'Salatu Munajiyyah'
                },
                {
                    id: 10,
                    created_at: curentDate,
                    slug_id: 'book-salawaat-ali',
                    type: Constants.book_type.salawaat,
                    title: 'Salawaat of Sayyidina Ali '
                },
                {
                    id: 11,
                    created_at: curentDate,
                    slug_id: 'book-salawaat-sayyid',
                    type: Constants.book_type.salawaat,
                    title: 'Sayyid as-Salawaat'
                }
            ]);
        });
};
