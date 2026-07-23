-- Combined Database Schema
-- Generated on: 2025-04-02T04:26:38.367Z

DROP TABLE IF EXISTS users CASCADE;

  CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  password VARCHAR(255) NOT NULL
  );

-- Next Table Schema --

DROP TABLE IF EXISTS investors CASCADE;

  CREATE TABLE investors(
	user_id           INTEGER PRIMARY KEY,
	firm              VARCHAR(100),
	invesment_focus   VARCHAR(50),
	capital           DECIMAL(15, 2),
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );

-- Next Table Schema --

DROP TABLE IF EXISTS investor_group CASCADE;

  CREATE TABLE investor_group(
  invest_group_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  num_of_investors INTEGER
  );

-- Next Table Schema --

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

-- Next Table Schema --

DROP TABLE IF EXISTS startup CASCADE;

  CREATE TABLE IF NOT EXISTS startup (
    startup_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    pitch_deck_url VARCHAR(100) UNIQUE,
    stage VARCHAR(100) NOT NULL,
    founded_date DATE NOT NULL
  );

-- Next Table Schema --

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

-- Next Table Schema --

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

-- Next Table Schema --

DROP TABLE IF EXISTS resource CASCADE;

  CREATE TABLE IF NOT EXISTS resource (
    resource_id SERIAL PRIMARY KEY,
    name VARCHAR(500),
    description VARCHAR(500),
    link VARCHAR(100)
  );

-- Next Table Schema --

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

-- Next Table Schema --

DROP TABLE IF EXISTS accelerator CASCADE;

  CREATE TABLE IF NOT EXISTS accelerator (
    accelerator_id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    location VARCHAR(500) NOT NULL,
    cohort_start_date DATE NOT NULL,
    program_focus TEXT,
    UNIQUE (name, location, cohort_start_date)
  );

-- Next Table Schema --

DROP TABLE IF EXISTS event CASCADE;  

  CREATE TABLE IF NOT EXISTS event (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    description VARCHAR(500),
    event_type VARCHAR(30)
  );

-- Next Table Schema --

DROP TABLE IF EXISTS attends CASCADE;
  
  CREATE TABLE IF NOT EXISTS attends (
    event_id INTEGER NOT NULL,
    startup_id INTEGER NOT NULL,
    registration_date DATE,
    PRIMARY KEY (event_id, startup_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id),
    FOREIGN KEY (startup_id) REFERENCES startup(startup_id)
  );

-- Next Table Schema --

CREATE TABLE IF NOT EXISTS Event (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    location VARCHAR(100),
    date DATE NOT NULL
  );

-- Dummy Data --


-- Insert dummy users
INSERT INTO users (email, name, password) VALUES
  ('sadra@example.com', 'Sadra', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('matthew@example.com', 'Matthew', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('amy@example.com', 'Amy', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('admin@example.com', 'Admin', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('admin2@example.com', 'Admin 2', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('hermione.granger@hogwarts.edu', 'Hermione Granger', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('ron.weasley@hogwarts.edu', 'Ron Weasley', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('harry.potter@hogwarts.edu', 'Harry Potter', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('luna.lovegood@hogwarts.edu', 'Luna Lovegood', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4'),
  ('draco.malfoy@hogwarts.edu', 'Draco Malfoy', '8215aefdd627911b78a4d84173e28b11:17e5befe7bd29d1b6ffa4fdf4005cd94dfd2c60d2944e5af2b86273228660fa012518634bcbc9913e2ecd0fb2dc3946fbc406e907911102a20304bef61dd6ff4');

  -- Insert dummy accelerators
INSERT INTO accelerator (name, location, cohort_start_date, program_focus) VALUES
  ('TechStars', 'Boulder, CO', '2023-03-01', 'Software Technology'),
  ('Y Combinator', 'Mountain View, CA', '2023-06-15', 'General Technology'),
  ('500 Startups', 'San Francisco, CA', '2023-01-10', 'E-commerce'),
  ('MassChallenge', 'Boston, MA', '2023-09-05', 'Healthcare'),
  ('Founders Factory', 'London, UK', '2023-05-20', 'Fintech'),
  ('LaunchLab', 'Chicago, IL', '2024-01-10', 'GreenTech'),
  ('NextWave', 'Toronto, ON', '2023-11-01', 'EdTech'),
  ('BetaBoost', 'Austin, TX', '2024-02-20', 'Health & Wellness'),
  ('IgniteHub', 'Vancouver, BC', '2023-08-05', 'Productivity Tools'),
  ('Velocity X', 'Atlanta, GA', '2023-10-15', 'Consumer Apps');

-- Insert dummy investors
INSERT INTO investors (user_id, firm, invesment_focus, capital) VALUES
  (1, 'Sequoia Capital', 'Software', 50000000.00),
  (2, 'Andreessen Horowitz', 'General Technology', 75000000.00),
  (3, 'SoftBank', 'E-commerce', 100000000.00),
  (4, 'Accel', 'Healthcare', 60000000.00),
  (5, 'Index Ventures', 'Fintech', 80000000.00)
  (6, 'Silverlight Partners', 'Tech', 20000000.00),
  (7, 'Northbrook Capital', 'Apps', 15000000.00),
  (8, 'Wellstone Group', 'Healthcare', 10000000.00),
  (9, 'Claremont Fund', 'Consumer Products', 18000000.00),
  (10, 'Xyz Ventures', 'General', 5000000.00);

-- Insert dummy investor groups
INSERT INTO investor_group (invest_group_id, name, email, num_of_investors) VALUES
  (1, 'TechStars Angels', 'techstars@invest.com', 10),
  (2, 'Y Combinator Investors', 'yc@invest.com', 15),
  (3, '500 Startups Network', '500startups@invest.com', 12),
  (4, 'MassChallenge Fund', 'masschallenge@invest.com', 8),
  (5, 'Founders Factory Backers', 'foundersfactory@invest.com', 9),
  (6, 'NextFund Partners', 'nextfund@invest.com', 6),
  (7, 'BuildLab Syndicate', 'buildlab@invest.com', 7),
  (8, 'Launch Collective', 'launch@invest.com', 5),
  (9, 'Alpha Group', 'alpha@invest.com', 4),
  (10, 'VentureLink Angels', 'venturelink@invest.com', 11),
  (11, 'Founders Network', 'founders@invest.com', 9),
  (12, 'TechBridge Investors', 'techbridge@invest.com', 8),
  (13, 'Growth Syndicate', 'growth@invest.com', 6),
  (14, 'SeedCircle', 'seedcircle@invest.com', 10),
  (15, 'Capital First Group', 'capitalfirst@invest.com', 7);

-- Insert dummy belongs_to relationships
INSERT INTO belongs_to (user_id, invest_group_id) VALUES
  (1, 1),
  (2, 1),
  (3, 5),
  (4, 2),
  (5, 5),
  (6, 3),
  (7, 4),
  (8, 6),
  (9, 4),
  (10, 10);

-- Insert dummy startups
INSERT INTO startup (name, description, pitch_deck_url, stage, founded_date) VALUES
  ('InnovateTech', 'AI-powered automation solutions', 'https://example.com/innovatetech-deck', 'Seed', '2022-11-15'),
  ('EcoSolutions', 'Sustainable packaging alternatives', 'https://example.com/ecosolutions-deck', 'Series A', '2021-08-22'),
  ('HealthcareAI', 'AI diagnostics for healthcare', 'https://example.com/healthcareai-deck', 'Seed', '2023-02-10'),
  ('FinanceFlow', 'Blockchain payment processing', 'https://example.com/financeflow-deck', 'Series B', '2020-05-18'),
  ('EdTechNow', 'Educational technology platform', 'https://example.com/edtechnow-deck', 'Idea', '2023-07-30'),
  ('App One', 'Basic productivity tool', 'https://example.com/app-one-deck', 'Seed', '2023-01-01'),
  ('App Two', 'Simple mobile app', 'https://example.com/app-two-deck', 'Series A', '2022-06-15'),
  ('Toolset', 'Utility tool for small teams', 'https://example.com/toolset-deck', 'Pre-seed', '2023-04-20'),
  ('Beta Four', 'Consumer testing app', 'https://example.com/beta-four-deck', 'Idea', '2023-07-07'),
  ('Whatever Inc', 'General tech startup', 'https://example.com/whatever-deck', 'Series B', '2021-12-01'),
  ('GlobalStart', 'Scalable global SaaS solutions', 'https://example.com/globalstart-deck', 'Series A', '2022-01-01'),
  ('EduNext', 'Next-gen education tools', 'https://example.com/edunext-deck', 'Seed', '2023-03-15'),
  ('HealthBridge', 'Bridging healthcare and AI', 'https://example.com/healthbridge-deck', 'Pre-seed', '2023-05-10');

-- Insert dummy managed_by relationships
INSERT INTO managed_by (user_id, startup_id, role, start_date) VALUES
  (1, 1, 'Founder', '2022-11-15'),
  (2, 2, 'CEO', '2021-08-22'),
  (3, 3, 'CTO', '2023-02-10'),
  (4, 4, 'Co-Founder', '2020-05-18'),
  (5, 5, 'Advisor', '2023-07-30'),
  (6, 6, 'Founder', '2023-01-01'),
  (7, 7, 'CEO', '2022-06-15'),
  (8, 8, 'Co-Founder', '2023-04-20'),
  (9, 9, 'Operations', '2023-07-07'),
  (10, 10, 'Advisor', '2021-12-01');

-- Insert dummy job postings
INSERT INTO job_posting (title, description, posted_date, job_type, startup_id) VALUES
  ('Dev Lead', 'Lead developer position for AI projects', '2023-10-15', 'Full-time', 1),
  ('UX Design', 'User experience designer for eco-friendly apps', '2023-09-22', 'Part-time', 2),
  ('ML Eng', 'Machine learning engineer for healthcare models', '2023-11-05', 'Full-time', 3),
  ('Back Dev', 'Backend developer for blockchain solutions', '2023-10-10', 'Contract', 4),
  ('Prod Mgr', 'Product manager for educational platform', '2023-12-01', 'Full-time', 5),
  ('Developer', 'Basic backend development role', '2023-11-01', 'Full-time', 6),
  ('Designer', 'General design and branding work', '2023-10-10', 'Part-time', 7),
  ('ML Intern', 'Assist with machine learning tasks', '2023-12-05', 'Internship', 8),
  ('Backend Developer', 'API development and integration', '2024-01-12', 'Contract', 9),
  ('Product Manager', 'Coordinate internal teams', '2024-02-02', 'Full-time', 10);

-- Insert dummy resources
INSERT INTO resource (name, description, link) VALUES
  ('Startup Funding Guide', 'Comprehensive guide to securing funding', 'https://example.com/funding-guide'),
  ('Pitch Deck Template', 'Professional template for investor pitches', 'https://example.com/pitch-template'),
  ('Market Research Tool', 'Tool for analyzing market trends', 'https://example.com/market-research'),
  ('Legal Document Pack', 'Essential legal documents for startups', 'https://example.com/legal-docs'),
  ('Financial Model', 'Financial projection templates for startups', 'https://example.com/financial-model'),
  ('Funding Basics', 'Introduction to startup funding', 'https://example.com/funding-basics'),
  ('Deck Template', 'Template for pitch presentations', 'https://example.com/deck-template'),
  ('Legal Checklist', 'Documents to prepare before fundraising', 'https://example.com/legal-checklist'),
  ('Startup Budget Sheet', 'Basic financial planning sheet', 'https://example.com/budget-sheet'),
  ('General Tips', 'Advice for early-stage startups', 'https://example.com/startup-tips');

-- Insert dummy accesses (linking startups to resources)
INSERT INTO accesses (resource_id, startup_id, access_date, download_date) VALUES
  (1, 1, 20231115, '2023-11-16'),
  (2, 2, 20231120, '2023-11-21'),
  (3, 3, 20231122, '2023-11-23'),
  (4, 4, 20231125, '2023-11-25'),
  (5, 5, 20231201, '2023-12-02'),
  (6, 6, 20240101, '2024-01-02'),
  (7, 7, 20240103, '2024-01-03'),
  (8, 8, 20240104, '2024-01-04'),
  (9, 9, 20240105, '2024-01-06'),
  (10, 10, 20240107, '2024-01-08');

-- Insert dummy events
INSERT INTO event (name, location, description, event_type) VALUES
  ('Startup Pitch Night', 'San Francisco, CA', 'Pitch your startup to investors', 'Networking'),
  ('Tech Conference 2023', 'New York, NY', 'Annual technology conference', 'Conference'),
  ('Investor Meetup', 'Boston, MA', 'Meet potential investors', 'Networking'),
  ('Hackathon 2023', 'Austin, TX', '48-hour coding challenge', 'Competition'),
  ('Founder Workshop', 'Seattle, WA', 'Workshop for startup founders', 'Workshop'),
  ('Startup Launch', 'New York, NY', 'Launch event for early-stage startups', 'Showcase'),
  ('Tech Meetup', 'San Francisco, CA', 'Networking event for founders', 'Networking'),
  ('Build Night', 'Remote', 'Online building session', 'Workshop'),
  ('Investor Talk', 'Los Angeles, CA', 'Panel with early-stage VCs', 'Fireside Chat'),
  ('Hackathon', 'Toronto, ON', '24-hour development competition', 'Competition');

-- Insert dummy attends relationships (startups attending events)
INSERT INTO attends (event_id, startup_id, registration_date) VALUES
  (1, 1, '2023-10-01'),
  (2, 2, '2023-09-15'),
  (3, 3, '2023-11-10'),
  (4, 4, '2023-10-20'),
  (5, 5, '2023-11-25'),
  (6, 6, '2024-01-01'),
  (7, 7, '2024-01-02'),
  (8, 8, '2024-01-03'),
  (9, 9, '2024-01-04'),
  (10, 10, '2024-01-05'),
  (1, 11, '2023-09-01'),
  (2, 11, '2023-09-02'),
  (3, 11, '2023-09-03'),
  (4, 11, '2023-09-04'),
  (5, 11, '2023-09-05'),
  (6, 11, '2023-09-06'),
  (7, 11, '2023-09-07'),
  (8, 11, '2023-09-08'),
  (9, 11, '2023-09-09'),
  (10, 11, '2023-09-10'),
  (1, 12, '2023-09-11'),
  (2, 12, '2023-09-12'),
  (3, 12, '2023-09-13'),
  (4, 12, '2023-09-14'),
  (5, 12, '2023-09-15'),
  (6, 12, '2023-09-16'),
  (7, 12, '2023-09-17'),
  (8, 12, '2023-09-18'),
  (9, 12, '2023-09-19'),
  (10, 12, '2023-09-20'),
  (1, 13, '2023-09-21'),
  (2, 13, '2023-09-22'),
  (3, 13, '2023-09-23'),
  (4, 13, '2023-09-24'),
  (5, 13, '2023-09-25'),
  (6, 13, '2023-09-26'),
  (7, 13, '2023-09-27'),
  (8, 13, '2023-09-28'),
  (9, 13, '2023-09-29'),
  (10, 13, '2023-09-30');
  
