export type UserTableType = {
  user_id: number;
  email: string;
  name?: string;
  password: string;
};

/**
 * Schema for the users table.
 * This schema is used to create the users table in the database.
 */
export const USER_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS users CASCADE;

  CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  password VARCHAR(255) NOT NULL
  );
`;

/**
 * Schema for the investors table.
 */
export const INVESTOR_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS investors CASCADE;

  CREATE TABLE investors(
	user_id           INTEGER PRIMARY KEY,
	firm              VARCHAR(100),
	invesment_focus   VARCHAR(50),
	capital           DECIMAL(15, 2),
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );
`;

/**
 * Schema for the investor_group table.
 */
export const INVESTOR_GROUP_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS investor_group CASCADE;

  CREATE TABLE investor_group(
  invest_group_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  num_of_investors INTEGER
  );
`;

/**
 * Schema for the belongs_to table.
 * This table is a junction table between the investor and belongs_to.
 */
export const BELONGS_TO_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS belongs_to CASCADE;

  CREATE TABLE belongs_to(
  user_id          INTEGER,
  invest_group_id  INTEGER,
  PRIMARY KEY(user_id, invest_group_id),
  FOREIGN KEY(user_id)
		REFERENCES investors(user_id),
  FOREIGN KEY(invest_group_id)
		REFERENCES investor_group(invest_group_id)
  );
`;

/**
 * Schema for the statup table.
 * This schema is used to create the startup table in the database.
 */
export const STARTUP_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS startup CASCADE;

  CREATE TABLE IF NOT EXISTS startup (
    startup_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    pitch_deck_url VARCHAR(100) UNIQUE,
    stage VARCHAR(100) NOT NULL,
    founded_date DATE NOT NULL
  );
`;

/**
 * Schema for the maanager table.
 * This schema is used to create statup - users relation table in the database.
 */
export const MANAGED_BY_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS managed_by CASCADE;

  CREATE TABLE IF NOT EXISTS managed_by (
    user_id INTEGER NOT NULL,
    startup_id INTEGER NOT NULL,
    role VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    PRIMARY KEY (user_id, startup_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (startup_id) REFERENCES startup(startup_id) ON DELETE CASCADE,
    CONSTRAINT valid_role CHECK (role IN ('Founder', 'Co-Founder', 'CEO', 'CTO', 'Employee', 'Advisor'))
  );
`;

/**
 * Schema for the job posting table.
 * This schema is used to create the job posting table in the database.
 */
export const JOB_POSTING_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS job_posting CASCADE;

  CREATE TABLE IF NOT EXISTS job_posting (
    job_id SERIAL PRIMARY KEY,
    title VARCHAR(10),
    description TEXT,
    posted_date DATE,
    job_type VARCHAR(10),
    startup_id INTEGER UNIQUE,
    FOREIGN KEY (startup_id) REFERENCES startup(startup_id)
  );
`;

/**
 * Schema for resources table.
 * This schema is used to create the resources table in the database.
 */
export const RESOURCES_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS resource CASCADE;

  CREATE TABLE IF NOT EXISTS resource (
    resource_id SERIAL PRIMARY KEY,
    name VARCHAR(500),
    description VARCHAR(500),
    link VARCHAR(100)
  );
`;

/**
 * Schema for resource accesses table.
 * Table junction between startup and resource.
 */
export const ACCESSES_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS accesses CASCADE;  

  CREATE TABLE IF NOT EXISTS accesses (
    resource_id INTEGER NOT NULL,
    startup_id INTEGER NOT NULL,
    access_date INTEGER,
    download_date VARCHAR(10),
    PRIMARY KEY (resource_id, startup_id),
    FOREIGN KEY (resource_id) REFERENCES resource(resource_id),
    FOREIGN KEY (startup_id) REFERENCES startup(startup_id)
  );
`;

/**
 * Schema for the accelerator table.
 */
export const ACCELERATOR_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS accelerator CASCADE;

  CREATE TABLE IF NOT EXISTS accelerator (
    accelerator_id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    location VARCHAR(500) NOT NULL,
    cohort_start_date DATE NOT NULL,
    program_focus TEXT,
    UNIQUE (name, location, cohort_start_date)
  );
`;

/**
 * Schema for the event table.
 */
export const EVENTS_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS event CASCADE;  

  CREATE TABLE IF NOT EXISTS event (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    description VARCHAR(500),
    event_type VARCHAR(30)
  );
`;

/**
 * Schema for the attends table.
 * This table is a junction table between the event and startup tables.
 */
export const ATTENDS_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS attends CASCADE;
  
  CREATE TABLE IF NOT EXISTS attends (
    event_id INTEGER NOT NULL,
    startup_id INTEGER NOT NULL,
    registration_date DATE,
    PRIMARY KEY (event_id, startup_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id),
    FOREIGN KEY (startup_id) REFERENCES startup(startup_id)
  );
`;

export type EventTableType = {
  event_id: number;
  name: string;
  event_type?: string;
  location?: string;
  date?: string;
};

export const EVENT_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS Event (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    location VARCHAR(100),
    date DATE NOT NULL
  );
`;

export const FUNDING_ROUND_TABLE_SCHEMA = `
  DROP TABLE IF EXISTS funding_round CASCADE;

  CREATE TABLE IF NOT EXISTS funding_round(
    round_no       INTEGER NOT NULL,
    amount_raised  INTEGER NOT NULL,
    round_label    VARCHAR(100) NOT NULL,
    date_closed    DATE NOT NULL,
    user_id        INTEGER,
    startup_id	   INTEGER,
    PRIMARY KEY(round_no, user_id, startup_id),
    FOREIGN KEY(user_id)
        REFERENCES investors(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(startup_id)
        REFERENCES startup(startup_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
  );
`;
