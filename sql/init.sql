DROP TABLE IF EXISTS Event CASCADE;

CREATE TABLE Event (
  event_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
);

INSERT INTO Event (name, event_type, location, date) VALUES
('Tech Talk 1', 'Talk', 'Vancouver', '2025-04-02'),
('Pitch Night 1', 'Pitch', 'Toronto', '2025-04-05'),
('Networking 1', 'Networking', 'Vancouver', '2025-04-07'),
('Workshop A', 'Workshop', 'Calgary', '2025-04-10'),
('Panel 1', 'Panel', 'Online', '2025-04-12'),
('Demo Day A', 'Showcase', 'Montreal', '2025-04-14'),
('Tech Talk 2', 'Talk', 'Toronto', '2025-04-16'),
('Pitch Night 2', 'Pitch', 'Toronto', '2025-04-18'),
('Networking 2', 'Networking', 'Vancouver', '2025-04-20'),
('Workshop B', 'Workshop', 'Online', '2025-04-22'),
('Panel 2', 'Panel', 'Calgary', '2025-04-24'),
('Demo Day B', 'Showcase', 'Toronto', '2025-04-26'),
('Tech Talk 3', 'Talk', 'Online', '2025-04-28'),
('Startup Chat', 'Talk', 'Vancouver', '2025-04-30'),
('Final Pitches', 'Pitch', 'Montreal', '2025-05-02'),
('Speed Networking', 'Networking', 'Toronto', '2025-05-04');

