import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const artists = sqliteTable('artists', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  station: text('station').notNull(),
  image: text('image').notNull(),
  bio: text('bio').notNull(),
  genre: text('genre').notNull(),
  experience: text('experience').notNull(),
  speciality: text('speciality').notNull(),
  createdAt: text('created_at').notNull(),
});

export const galleryImages = sqliteTable('gallery_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  url: text('url').notNull(),
  alt: text('alt').notNull(),
  year: text('year').notNull(),
  createdAt: text('created_at').notNull(),
});

export const partners = sqliteTable('partners', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  logo: text('logo').notNull(),
  website: text('website'),
  createdAt: text('created_at').notNull(),
});

export const newsArticles = sqliteTable('news_articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  category: text('category').notNull(),
  date: text('date').notNull(),
  author: text('author').notNull(),
  image: text('image').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
});

export const volunteerApplications = sqliteTable('volunteer_applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  areaOfInterest: text('area_of_interest').notNull(),
  message: text('message'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const merchandise = sqliteTable('merchandise', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: text('price').notNull(),
  image: text('image').notNull(),
  category: text('category').notNull(),
  available: integer('available').notNull().default(1),
  createdAt: text('created_at').notNull(),
});

export const competitionEntries = sqliteTable('competition_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  gender: text('gender').notNull(),
  age: integer('age').notNull(),
  photoUrl: text('photo_url').notNull(),
  submittedAt: text('submitted_at').notNull(),
  email: text('email'),
});