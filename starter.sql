CREATE DATABASE IAmBeeDeeBee;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(32) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- Plaintext password for testing with Buzz Lightyear is password123
INSERT INTO Users (name, email, password)
VALUES ('Buzz Lightyear', 'test@test.com', '$2b$14$jzunvn7/adGHN7X.S.wd6eWrrAivlAJlA2HpaFmxfmCuTOhWFDcmu');


CREATE TABLE Bees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  species VARCHAR(64) NOT NULL,
  common_name VARCHAR(64)
);
INSERT INTO Bees (species, common_name)
VALUES
('Apis mellifera', 'Western Honeybee'),
('Bombus terrestris', 'Buff-tailed Bumblebee'),
('Megachile rotundata', 'Leafcutter Bee'),
('Xylocopa violacea', 'Violet Carpenter Bee'),
('Trigona carbonaria', 'Sugarbag Bee'),
('Bombus impatiens', 'Common Eastern Bumblebee'),
('Apis cerana', 'Asian Honeybee'),
('Osmia bicornis', 'Red Mason Bee'),
('Anthidium manicatum', 'Wool Carder Bee'),
('Melipona beecheii', 'Royal Jelly Bee');


CREATE TABLE BeeSightings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bee_id INT,
  user_id INT,
  location VARCHAR(32),
  description VARCHAR(2048),
  observed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bee_id) REFERENCES Bees(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
INSERT INTO BeeSightings (bee_id, user_id, location, description, observed_at)
VALUES
(1, 1, 'Railroad Park', 'Observed a Western Honeybee gathering nectar from wildflowers.', '2024-11-15 10:00:00'),
(3, 1, 'Vulcan Trail', 'Saw a Leafcutter Bee cutting pieces of leaves for its nest.', '2024-11-16 14:30:00'),
(5, 1, 'Ruffner Mountain', 'Spotted a Sugarbag Bee near a hollow tree trunk.', '2024-11-17 09:45:00');
