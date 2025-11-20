CREATE TABLE `competition_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`gender` text NOT NULL,
	`age` integer NOT NULL,
	`photo_url` text NOT NULL,
	`submitted_at` text NOT NULL,
	`email` text
);
