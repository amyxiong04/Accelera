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
  ('EdTechNow', 'Educational technology platform', 'https://example.com/edtechnow-deck', 'Idea', '2023-07-30');

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
  ('Founder Workshop', 'Seattle, WA', 'Workshop for startup founders', 'Workshop');

-- Insert dummy attends relationships (startups attending events)
INSERT INTO attends (event_id, startup_id, registration_date) VALUES
  (1, 1, '2023-10-01'),
  (2, 2, '2023-09-15'),
  (3, 3, '2023-11-10'),
  (4, 4, '2023-10-20'),
  (5, 5, '2023-11-25');
  
`;
