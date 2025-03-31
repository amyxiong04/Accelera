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
    CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL
    );
`;

export const ACCELERATOR_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS accelerators (
        accelerator_id SERIAL PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        location VARCHAR(500) NOT NULL,
        cohort_start_date DATE NOT NULL,
        program_focus TEXT,
        UNIQUE(name, location, cohort_start_date)
    );
`;

export const RESOURCE_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS resources (
    resource_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(100) NOT NULL
    );
`;

export const EVENT_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS event (
        event_id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        location VARCHAR(100),
        description VARCHAR(500),
        event_type VARCHAR(30)
    );
`;

export const APPLIES_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS applies (
        accelerator_id INT,
        startup_id INT,
        application_date DATE,
        status VARCHAR(10),
        PRIMARY KEY(accelerator_id, startup_id),
        FOREIGN KEY(accelerator_id) REFERENCES accelerators(accelerator_id),
        FOREIGN KEY(startup_id) REFERENCES startups(startup_id)
    );
`;

export const INVESTOR_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS investors (
        user_id INT PRIMARY KEY,
        firm VARCHAR(100),
        investment_focus VARCHAR(50),
        capital DECIMAL(15, 2),
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
`;

export const MENTOR_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS mentors (
        user_id INT PRIMARY KEY,
        startup_id INT UNIQUE,
        bio TEXT,
        years_of_experience INT NOT NULL,
        role VARCHAR(100),
        start_date DATE,
        end_date DATE,
        expertise VARCHAR(100) NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY(startup_id) REFERENCES startups(startup_id)
    );
`;

export const STARTUP_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS startups (
        startup_id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        FOREIGN KEY(name) REFERENCES startup_attributes(name)
    );
`;

export const STARTUP_ATTRIBUTES_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS startup_attributes (
        name VARCHAR(100) PRIMARY KEY,
        description TEXT,
        pitch_deck_url VARCHAR(100) UNIQUE,
        FOREIGN KEY(pitch_deck_url) REFERENCES startup_details(pitch_deck_url)
    );
`;

export const STARTUP_DETAILS_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS startup_details (
        pitch_deck_url VARCHAR(100) PRIMARY KEY,
        stage VARCHAR(100),
        founded_date DATE
    );
`;

// export const BELONGS_TO_TABLE_SCHEMA = `
//     CREATE TABLE IF NOT EXISTS belongs_to (
//         user_id INT,
//         invest_group_id INT,
//         PRIMARY KEY(user_id, invest_group_id),
//         FOREIGN KEY(user_id) REFERENCES investors(user_id),
//         FOREIGN KEY(invest_group_id) REFERENCES investor_group(invest_group_id)
//     );
// `;

export const MANAGED_BY_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS managed_by (
        user_id INT NOT NULL,
        startup_id INT NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('Founder', 'Co-Founder', 'CEO', 'CTO', 'Employee', 'Advisor')),
        start_date DATE NOT NULL,
        PRIMARY KEY(user_id, startup_id),
        FOREIGN KEY(user_id) REFERENCES users(user_id),
        FOREIGN KEY(startup_id) REFERENCES startups(startup_id)
    );
`;

export const FUNDING_ROUND_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS funding_round (
        round_no INT,
        amount_raised INT,
        round_label VARCHAR(100),
        date_closed DATE,
        user_id INT,
        startup_id INT,
        PRIMARY KEY(round_no, user_id, startup_id),
        FOREIGN KEY(user_id) REFERENCES investors(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(startup_id) REFERENCES startups(startup_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
`;

export const JOB_POSTING_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS job_posting_posts (
        job_id INT PRIMARY KEY,
        title VARCHAR(10),
        description TEXT,
        posted_date DATE,
        job_type VARCHAR(10),
        startup_id INT UNIQUE,
        FOREIGN KEY(startup_id) REFERENCES startups(startup_id)
    );
`;

export const ACCESSES_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS accesses (
        access_date INT,
        download_date VARCHAR(10),
        resource_id INT,
        startup_id INT,
        PRIMARY KEY(resource_id, startup_id),
        FOREIGN KEY(startup_id) REFERENCES startups(startup_id),
        FOREIGN KEY(resource_id) REFERENCES resources(resource_id)
    );
`;

export const ATTENDS_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS attends (
        event_id INT,
        startup_id INT,
        registration_date DATE,
        PRIMARY KEY(event_id, startup_id),
        FOREIGN KEY(event_id) REFERENCES event(event_id),
        FOREIGN KEY(startup_id) REFERENCES startups(startup_id)
    );
`;
