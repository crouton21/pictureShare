DATABASE NAME: photo_gallery

CREATE TABLE photos(
	id serial primary key,
	photo varchar,
	likes int,
    description varchar
);

CREATE TABLE comments(
	id serial primary key,
	photo_id int,
	comment varchar,
    time_submitted text DEFAULT NOW
);