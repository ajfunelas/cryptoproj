-- CREATE TABLE USERS (
--     ID INT,
--     USERNAME varchar(255),
--     PASSWORD varchar(255),
--     EMAIL varchar(255)
-- );

CREATE TABLE tickers (
    id TEXT PRIMARY KEY NOT NULL,
    price TEXT NOT NULL,
    time TEXT NOT NULL,
    bid TEXT NOT NULL,
    ask TEXT NOT NULL,
    volume TEXT NOT NULL,
    size TEXT
);

