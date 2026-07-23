import { hashPassword } from '@/lib/hash-password';

const useHashedPasswords = [hashPassword('password123')];

export const DUMMY_DATA = `
-- Insert dummy users
INSERT INTO users (email, name, password) VALUES
  ('sadra@example.com', 'Sadra', '${useHashedPasswords[0]}'),
  ('matthew@example.com', 'Matthew', '${useHashedPasswords[0]}'),
  ('amy@example.com', 'Amy', '${useHashedPasswords[0]}'),
  ('admin@example.com', 'Admin', '${useHashedPasswords[0]}'),
  ('admin2@example.com', 'Admin 2', '${useHashedPasswords[0]}');

  -- Insert dummy accelerators
INSERT INTO accelerator (name, location, cohort_start_date, program_focus) VALUES
  ('TechStars', 'Boulder, CO', '2023-03-01', 'Software Technology'),
  ('Y Combinator', 'Mountain View, CA', '2023-06-15', 'General Technology'),
  ('500 Startups', 'San Francisco, CA', '2023-01-10', 'E-commerce'),
  ('MassChallenge', 'Boston, MA', '2023-09-05', 'Healthcare'),
  ('Founders Factory', 'London, UK', '2023-05-20', 'Fintech');

-- Insert dummy investors
INSERT INTO investors (user_id, firm, invesment_focus, capital) VALUES
  (1, 'Sequoia Capital', 'Software', 50000000.00),
  (2, 'Andreessen Horowitz', 'General Technology', 75000000.00),
  (3, 'SoftBank', 'E-commerce', 100000000.00),
  (4, 'Accel', 'Healthcare', 60000000.00),
  (5, 'Index Ventures', 'Fintech', 80000000.00);

-- Insert dummy investor groups
INSERT INTO investor_group (invest_group_id, name, email, num_of_investors) VALUES
  (1, 'TechStars Angels', 'techstars@invest.com', 10),
  (2, 'Y Combinator Investors', 'yc@invest.com', 15),
  (3, '500 Startups Network', '500startups@invest.com', 12),
  (4, 'MassChallenge Fund', 'masschallenge@invest.com', 8),
  (5, 'Founders Factory Backers', 'foundersfactory@invest.com', 9);

-- Insert dummy belongs_to relationships
INSERT INTO belongs_to (user_id, invest_group_id) VALUES
  (1, 1),
  (2, 1),
  (3, 5),
  (4, 2),
  (5, 5);

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
  (5, 5, 'Advisor', '2023-07-30');

-- Insert dummy job postings
INSERT INTO job_posting (title, description, posted_date, job_type, startup_id) VALUES
  ('Dev Lead', 'Lead developer position for AI projects', '2023-10-15', 'Full-time', 1),
  ('UX Design', 'User experience designer for eco-friendly apps', '2023-09-22', 'Part-time', 2),
  ('ML Eng', 'Machine learning engineer for healthcare models', '2023-11-05', 'Full-time', 3),
  ('Back Dev', 'Backend developer for blockchain solutions', '2023-10-10', 'Contract', 4),
  ('Prod Mgr', 'Product manager for educational platform', '2023-12-01', 'Full-time', 5);

-- Insert dummy resources
INSERT INTO resource (name, description, link) VALUES
  ('Startup Funding Guide', 'Comprehensive guide to securing funding', 'https://example.com/funding-guide'),
  ('Pitch Deck Template', 'Professional template for investor pitches', 'https://example.com/pitch-template'),
  ('Market Research Tool', 'Tool for analyzing market trends', 'https://example.com/market-research'),
  ('Legal Document Pack', 'Essential legal documents for startups', 'https://example.com/legal-docs'),
  ('Financial Model', 'Financial projection templates for startups', 'https://example.com/financial-model');

-- Insert dummy accesses (linking startups to resources)
INSERT INTO accesses (resource_id, startup_id, access_date, download_date) VALUES
  (1, 1, 20231115, '2023-11-16'),
  (2, 2, 20231120, '2023-11-21'),
  (3, 3, 20231122, '2023-11-23'),
  (4, 4, 20231125, '2023-11-25'),
  (5, 5, 20231201, '2023-12-02');

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

-- Insert dummy funding_round data
INSERT INTO funding_round (round_no, amount_raised, round_label, date_closed, user_id, startup_id)  
VALUES  
    (1, 500000, 'Seed Round', '2024-03-15', 1, 3),  
    (2, 2000000, 'Series A', '2025-06-20', 2, 1),  
    (1, 750000, 'Seed Round', '2024-05-10', 3, 2),  
    (2, 5000000, 'Series B', '2026-09-30', 4, 3), 
    (3, 5000000, 'Series C', '2026-09-30', 2, 5),  
    (4, 5000000, 'Series D', '2026-09-30', 2, 4);  
`;
